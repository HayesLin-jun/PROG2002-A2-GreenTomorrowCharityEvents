/* Green Tomorrow - A2-2 "Ocean Discovery Desk": shared global helpers.
   Loaded before every page script; page scripts call these as globals. */

const ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const $ = (selector, root = document) => root.querySelector(selector);

/* Fetches JSON from the Express API and throws when the response is not ok. */
const api = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Request failed with status " + response.status);
  return response.json();
};

/* Returns the value as text with HTML characters neutralised. */
const escapeText = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => ESCAPE_MAP[character]);

/* Builds a safe /assets path for an image filename coming from the API. */
const assetPath = (file) => "/assets/" + encodeURIComponent(String(file ?? ""));

/* Maps an event status onto a stable CSS class suffix. */
const statusClass = (status) =>
  ["upcoming", "ongoing", "suspended"].includes(String(status))
    ? "is-" + String(status)
    : "is-unknown";

/* Dense index card used by the search results grid on search.html. */
const card = (event) => {
  const title = escapeText(event.title);
  const fallback = escapeText(String(event.category ?? "").toUpperCase() + " EVENT");
  const media = event.image
    ? '<img src="' +
      assetPath(event.image) +
      '" alt="' +
      title +
      '" loading="lazy" decoding="async" data-fallback="' +
      fallback +
      '">'
    : '<span class="media-fallback">' + fallback + "</span>";
  return `
    <article class="index-card">
      <div class="index-media">${media}</div>
      <div class="index-body">
        <p class="tag-row">
          <span class="tag">${escapeText(event.category)}</span>
          <span class="tag ${statusClass(event.status)}">${escapeText(event.status)}</span>
        </p>
        <h3 class="index-title">
          <a href="event.html?id=${encodeURIComponent(event.id)}">${title}</a>
        </h3>
        <dl class="index-meta">
          <div><dt>When</dt><dd>${escapeText(event.date)}</dd></div>
          <div><dt>Where</dt><dd>${escapeText(event.location)}</dd></div>
        </dl>
      </div>
    </article>`;
};

/* Shows a plain readable message inside a placeholder node. */
const showState = (node, text) => {
  if (!node) return;
  node.innerHTML = '<div class="state" role="status">' + escapeText(text) + "</div>";
};

/* Shows an offline message with a working Retry button for form/result areas. */
const showRetry = (node, text, onRetry) => {
  if (!node) return;
  node.innerHTML =
    '<div class="state state-error" role="alert">' +
    "<p>" +
    escapeText(text) +
    "</p>" +
    '<button class="button" type="button">Retry</button>' +
    "</div>";
  const retry = $("button", node);
  if (retry && typeof onRetry === "function") retry.addEventListener("click", onRetry);
};

/* Image error events do not bubble, so a capturing listener swaps any image
   that has a data-fallback value for readable text. */
document.addEventListener(
  "error",
  (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement) || !target.dataset.fallback) return;
    const fallback = document.createElement("span");
    fallback.className = "media-fallback";
    fallback.textContent = target.dataset.fallback;
    target.replaceWith(fallback);
  },
  true,
);
