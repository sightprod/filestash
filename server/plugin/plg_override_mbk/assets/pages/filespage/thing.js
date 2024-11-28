diff --git a/public/assets/pages/filespage/thing.js b/public/assets/pages/filespage/thing.js
index 386c2375..fc70bc2b 100644
--- a/public/assets/pages/filespage/thing.js
+++ b/public/assets/pages/filespage/thing.js
@@ -35,6 +35,20 @@ export function init() {
     };
 }
 
+window.onThingClick = function(e, self) {
+    e.preventDefault(); e.stopPropagation();
+    const path = self.parentElement.getAttribute("data-path");
+
+    const region = "eu-west-1";
+    const sPath = path.replace(new RegExp("^/"), "").split("/");
+    const bucket = sPath[0];
+    const key = "/" + sPath.slice(1).map((chunk) => encodeURIComponent(chunk).replaceAll("%20", "+")).join("/");
+    const url = `https://${bucket}.s3.${region}.amazonaws.com${key}`;
+
+    navigator.clipboard.writeText(url);
+    alert(url);
+}
+
 const $tmpl = createElement(`
     <a href="__TEMPLATE__" class="component_thing no-select" draggable="false" data-link>
         <div class="component_checkbox"><input name="select" type="checkbox"><span class="indicator"></span></div>
@@ -46,6 +60,15 @@ const $tmpl = createElement(`
             </span></span>
         </span>
         <span class="component_datetime"></span>
+        <div class="component_action" onclick="onThingClick(event, this)" data-bind="action">
+            <span><img class="component_icon" draggable="false" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayINCgkgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNDQyLjI0NiA0NDIuMjQ2Ig0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIHN0eWxlPSJmaWxsOnJnYigyNDIsIDI0MiwgMjQyKTsiPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDA5LjY1NywzMi40NzRjLTQzLjE0Ni00My4xNDYtMTEzLjgzMi00My4xNDYtMTU2Ljk3OCwwbC04NC43NjMsODQuNzYyYzI5LjA3LTguMjYyLDYwLjU4OS02LjEyLDg4LjEyOSw2LjczMg0KCQkJbDQ0LjA2My00NC4wNjRjMTcuMTM2LTE3LjEzNiw0NC45ODItMTcuMTM2LDYyLjExOCwwYzE3LjEzNiwxNy4xMzYsMTcuMTM2LDQ0Ljk4MiwwLDYyLjExOGwtNTUuMzg2LDU1LjM4NmwtMzYuNDE0LDM2LjQxNA0KCQkJYy0xNy4xMzYsMTcuMTM2LTQ0Ljk4MiwxNy4xMzYtNjIuMTE5LDBsLTQ3LjQzLDQ3LjQzYzExLjAxNiwxMS4wMTcsMjMuODY4LDE5LjI3OCwzNy4zMzIsMjQuNDgNCgkJCWMzNi40MTUsMTQuMzgyLDc4LjY0Myw4Ljg3NCwxMTAuNDY3LTE2LjIxOWMzLjA2LTIuNDQ3LDYuNDI2LTUuMjAxLDkuMTgtOC4yNjJsNTcuMjIyLTU3LjIyMmwzNC41NzgtMzQuNTc4DQoJCQlDNDUzLjEwOSwxNDYuMzA2LDQ1My4xMDksNzUuOTI2LDQwOS42NTcsMzIuNDc0eiIvPg0KCQk8cGF0aCBkPSJNMTg0LjEzNSwzMjAuMTE0bC00Mi4yMjgsNDIuMjI4Yy0xNy4xMzYsMTcuMTM3LTQ0Ljk4MiwxNy4xMzctNjIuMTE4LDBjLTE3LjEzNi0xNy4xMzYtMTcuMTM2LTQ0Ljk4MSwwLTYyLjExOA0KCQkJbDkxLjgtOTEuNzk5YzE3LjEzNi0xNy4xMzYsNDQuOTgyLTE3LjEzNiw2Mi4xMTksMGw0Ny40My00Ny40M2MtMTEuMDE2LTExLjAxNi0yMy44NjgtMTkuMjc4LTM3LjMzMi0yNC40OA0KCQkJYy0zOC4yNS0xNS4zLTgzLjIzMi04LjI2Mi0xMTUuMzYyLDIwLjUwMmMtMS41MywxLjIyNC0zLjA2LDIuNzU0LTQuMjg0LDMuOTc4bC05MS44LDkxLjc5OQ0KCQkJYy00My4xNDYsNDMuMTQ2LTQzLjE0NiwxMTMuODMyLDAsMTU2Ljk3OWM0My4xNDYsNDMuMTQ2LDExMy44MzIsNDMuMTQ2LDE1Ni45NzgsMGw4Mi45MjctODMuODQ1DQoJCQlDMjMwLjAzNSwzMzUuNzE5LDIyMC4yNDMsMzM0LjQ5NiwxODQuMTM1LDMyMC4xMTR6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=" alt="download"></span>
+        </div>
+        <style>
+        .component_action > span > .component_icon { box-sizing: border-box; background: rgba(0,0,0,0.1); border-radius: 50%; padding: 4px; filter: contrast(0); }
+        .component_action { display: none; float: right; color: #6f6f6f; line-height: 25px; margin: 0 -10px; padding: 0 10px; position: relative; }
+        .list .component_action { position: absolute; top: 10px; right: 10px; }
+        .component_thing:hover .component_action { display: block; }
+        </style>
         <div class="selectionOverlay"></div>
     </a>
 `);
@@ -71,6 +94,7 @@ export function createThing({
     const [, ext] = formatFile(name);
     const mime = TYPES.MIME[ext.toLowerCase()];
     const $thing = assert.type($tmpl.cloneNode(true), HTMLElement);
+    if (isDir(path)) $thing.querySelector(`[data-bind="action"]`).classList.add("hidden");
 
     // you might wonder why don't we use querySelector to nicely get the dom nodes? Well,
     // we're in the hot path, better performance here is critical to get 60FPS.
