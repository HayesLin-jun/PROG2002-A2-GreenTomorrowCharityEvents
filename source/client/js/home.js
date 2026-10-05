/* Green Tomorrow - A2-2: index.html featured activities (dense row list). */

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("#featured-events");

  /* One dense featured row: small thumbnail, location + date, status, link. */
  const row = (event) => {
    const title = escapeText(event.title);
    const fallback = escapeText(String(event.category ?? "").toUpperCase() + " EVENT");
    const media = event.image
      ? `<img src="${assetPath(event.image)}" alt="${title}" width="120" height="80" loading="lazy" decoding="async" data-fallback="${fallback}">`
      : `<span class="media-fallback">${fallback}</span>`;
    return `
      <article class="featured-row">
        <div class="featured-thumb">${media}</div>
        <div class="featured-info">
          <h3 class="featured-title">
            <a href="event.html?id=${encodeURIComponent(event.id)}">${title}</a>
          </h3>
          <p class="featured-meta">
            <span class="featured-location">${escapeText(event.location)}</span>
            <span class="featured-date">${escapeText(event.date)}</span>
          </p>
        </div>
        <span class="tag ${statusClass(event.status)}">${escapeText(event.status)}</span>
        <a class="featured-link" href="event.html?id=${encodeURIComponent(event.id)}">Details</a>
      </article>`;
  };

  const load = async () => {
    showState(list, "Loading featured activities…");
    try {
      const events = await api("/api/events/featured");
      if (!events.length) {
        showState(list, "No featured activities right now. Open the events index to browse everything.");
        return;
      }
      list.innerHTML = events.map(row).join("");
    } catch {
      showRetry(
        list,
        "Featured activities could not load. The events database may be offline.",
        load,
      );
    }
  };

  load();
});
