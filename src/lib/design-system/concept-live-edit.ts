/** Live-edit helpers for concept HTML previews */

export const LIVE_EDIT_STORAGE_PREFIX = "santi-concept-edit:";
export const LIVE_EDIT_MSG = "santi-live-edit" as const;

const EDITOR_STYLE_ID = "santi-live-edit-style";
const EDITOR_SCRIPT_ID = "santi-live-edit-script";
const EDITOR_ATTR = "data-santi-editable";

export function localStorageKey(id: string) {
  return `${LIVE_EDIT_STORAGE_PREFIX}${id}`;
}

export function saveLocalConceptHtml(id: string, html: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(localStorageKey(id), html);
  } catch {
    // quota / private mode
  }
}

export function loadLocalConceptHtml(id: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(localStorageKey(id));
  } catch {
    return null;
  }
}

export function clearLocalConceptHtml(id: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(localStorageKey(id));
  } catch {
    // ignore
  }
}

/** Remove injected editor styles/scripts and contenteditable attrs */
export function stripEditorArtifacts(html: string): string {
  let out = html;
  out = out.replace(
    /<style[^>]*id=["']santi-live-edit-style["'][^>]*>[\s\S]*?<\/style>/gi,
    "",
  );
  out = out.replace(
    /<script[^>]*id=["']santi-live-edit-script["'][^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  out = out.replace(/\scontenteditable=["'][^"']*["']/gi, "");
  out = out.replace(/\sspellcheck=["'][^"']*["']/gi, "");
  out = out.replace(new RegExp(`\\s${EDITOR_ATTR}(?:=["'][^"']*["'])?`, "gi"), "");
  out = out.replace(/\sclass=["']([^"']*)["']/gi, (_m, cls: string) => {
    const cleaned = cls
      .split(/\s+/)
      .filter((c) => c && c !== "santi-edit-hover" && c !== "santi-edit-focus")
      .join(" ");
    return cleaned ? ` class="${cleaned}"` : "";
  });
  return out.trim();
}

function editorBootstrapScript(): string {
  // Runs inside the iframe document
  return `
(function () {
  if (window.__santiLiveEdit) return;
  window.__santiLiveEdit = true;
  var MSG = ${JSON.stringify(LIVE_EDIT_MSG)};
  var SELECTOR = "h1,h2,h3,h4,p,li,a.btn,.lead,.sub,.eyebrow,td,th,blockquote,figcaption";
  var BANNER = ".banner";

  function isBanner(el) {
    return !!(el && el.closest && el.closest(BANNER));
  }

  function markEditable() {
    document.querySelectorAll(SELECTOR).forEach(function (el) {
      if (isBanner(el)) return;
      if (el.closest("script,style,noscript")) return;
      el.setAttribute("contenteditable", "true");
      el.setAttribute("spellcheck", "true");
      el.setAttribute(${JSON.stringify(EDITOR_ATTR)}, "1");
    });
  }

  function cleanClone(root) {
    var clone = root.cloneNode(true);
    var style = clone.querySelector("#${EDITOR_STYLE_ID}");
    if (style) style.remove();
    var script = clone.querySelector("#${EDITOR_SCRIPT_ID}");
    if (script) script.remove();
    clone.querySelectorAll("[contenteditable]").forEach(function (el) {
      el.removeAttribute("contenteditable");
      el.removeAttribute("spellcheck");
      el.removeAttribute(${JSON.stringify(EDITOR_ATTR)});
      el.classList.remove("santi-edit-hover", "santi-edit-focus");
    });
    return clone;
  }

  function emit(type, extra) {
    try {
      parent.postMessage(Object.assign({ channel: MSG, type: type }, extra || {}), "*");
    } catch (e) {}
  }

  function fullHtml() {
    var doctype = "<!DOCTYPE html>";
    var clone = cleanClone(document.documentElement);
    return doctype + "\\n" + clone.outerHTML;
  }

  markEditable();

  document.addEventListener("input", function () {
    emit("dirty");
  }, true);

  document.addEventListener("mouseover", function (e) {
    var t = e.target;
    if (!t || !t.getAttribute || t.getAttribute(${JSON.stringify(EDITOR_ATTR)}) !== "1") return;
    t.classList.add("santi-edit-hover");
  }, true);

  document.addEventListener("mouseout", function (e) {
    var t = e.target;
    if (!t || !t.classList) return;
    t.classList.remove("santi-edit-hover");
  }, true);

  document.addEventListener("focusin", function (e) {
    var t = e.target;
    if (!t || !t.classList) return;
    if (t.getAttribute(${JSON.stringify(EDITOR_ATTR)}) === "1") t.classList.add("santi-edit-focus");
  }, true);

  document.addEventListener("focusout", function (e) {
    var t = e.target;
    if (!t || !t.classList) return;
    t.classList.remove("santi-edit-focus");
  }, true);

  window.addEventListener("message", function (ev) {
    var data = ev.data;
    if (!data || data.channel !== MSG) return;
    if (data.type === "requestHtml") {
      emit("html", { html: fullHtml(), requestId: data.requestId });
    }
  });

  emit("ready");
})();
`.trim();
}

function editorStyles(): string {
  return `
[${EDITOR_ATTR}="1"] { cursor: text; outline: 1px dashed transparent; transition: outline-color .15s ease; }
[${EDITOR_ATTR}="1"].santi-edit-hover { outline-color: rgba(201,162,39,.55); }
[${EDITOR_ATTR}="1"].santi-edit-focus { outline-color: #c9a227; outline-width: 2px; outline-style: solid; }
.banner, .banner * { cursor: default !important; }
`.trim();
}

/** Inject live-edit style + script into a full HTML document */
export function injectLiveEditRuntime(html: string): string {
  const styleTag = `<style id="${EDITOR_STYLE_ID}">${editorStyles()}</style>`;
  const scriptTag = `<script id="${EDITOR_SCRIPT_ID}">${editorBootstrapScript()}</script>`;

  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${styleTag}${scriptTag}</body>`);
  }
  if (/<\/html>/i.test(html)) {
    return html.replace(/<\/html>/i, `${styleTag}${scriptTag}</html>`);
  }
  return `${html}${styleTag}${scriptTag}`;
}

export type LiveEditMessage =
  | { channel: typeof LIVE_EDIT_MSG; type: "ready" }
  | { channel: typeof LIVE_EDIT_MSG; type: "dirty" }
  | {
      channel: typeof LIVE_EDIT_MSG;
      type: "html";
      html: string;
      requestId?: string;
    };

export function isLiveEditMessage(data: unknown): data is LiveEditMessage {
  if (!data || typeof data !== "object") return false;
  const d = data as { channel?: string; type?: string };
  return d.channel === LIVE_EDIT_MSG && typeof d.type === "string";
}
