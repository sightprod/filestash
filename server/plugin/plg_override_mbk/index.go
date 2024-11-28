package plg_override_mbk

import (
	"embed"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/gorilla/mux"

	. "github.com/mickael-kerjean/filestash/server/common"
	. "github.com/mickael-kerjean/filestash/server/middleware"
)

//go:embed assets/*
var STATIC embed.FS

func init() {
	Hooks.Register.StaticPatch(STATIC)
	Hooks.Register.HttpEndpoint(func(r *mux.Router, app *App) error {
		r.HandleFunc(
			WithBase("/api/s3link"),
			NewMiddlewareChain(
				s3LinkHandler,
				[]Middleware{ApiHeaders, SecureHeaders, SessionStart, LoggedInOnly},
				App{},
			),
		)
		return nil
	})
}

func s3LinkHandler(ctx *App, res http.ResponseWriter, req *http.Request) {
	p := path.Join(ctx.Session["path"], req.URL.Query().Get("path"))
	sPath := strings.Split(strings.TrimPrefix(p, "/"), "/")
	if len(sPath) < 2 {
		SendErrorResult(res, ErrNotValid)
		return
	}

	var (
		bucket = sPath[0]
		region = "eu-west-1"
		key    = "/" + strings.Join(escape(sPath[1:]), "/")
	)
	res.Write([]byte(fmt.Sprintf(
		"https://%s.s3.%s.amazonaws.com%s",
		bucket, region, key,
	)))
}

func escape(chunks []string) []string {
	for i, _ := range chunks {
		chunks[i] = url.QueryEscape(chunks[i])
	}
	return chunks
}
