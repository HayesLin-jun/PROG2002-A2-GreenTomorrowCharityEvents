/* Green Tomorrow - A2-2: event.html two-column first screen (facts rail + image). */

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const root = document.querySelector("#event-detail");

  const image = (name, alt) => {
    const fallback = escapeText("IMAGE UNAVAILABLE");
    return `<img src="${assetPath(name)}" alt="${escapeText(alt)}" loading="lazy" decoding="async" data-fallback="${fallback}">`;
  };

  const load = async () => {
    if (!id) {
      showState(root, "No event was selected. Open the events index and choose an activity.");
      return;
    }
    showState(root, "Loading event…");
    try {
      const event = await api(`/api/events/${encodeURIComponent(id)}`);
      const title = escapeText(event.title);
      const suspended = event.status === "suspended";

      const registration = suspended
        ? `<p class="facts-note">Registration is paused while this activity is suspended.</p>
           <a class="button is-disabled" role="link" aria-disabled="true">Register interest</a>`
        : `<a class="button" href="registration-placeholder.html?id=${encodeURIComponent(event.id)}">Register interest</a>`;

      const galleryItems = (event.gallery || [event.image])
        .filter(Boolean)
        .map(
          (name, index) =>
            `<figure class="gallery-item">${image(name, `${event.title} photograph ${index + 1}`)}</figure>`,
        )
        .join("");

      root.innerHTML = `
        <div class="event-head">
          <p class="tag-row">
            <span class="tag">${escapeText(event.category)}</span>
            <span class="tag ${statusClass(event.status)}">${escapeText(event.status)}</span>
          </p>
          <h1>${title}</h1>
          ${event.organisation ? `<p class="event-org">Run by ${escapeText(event.organisation)}</p>` : ""}
        </div>

        <div class="event-top">
          <div class="facts-rail">
            <h2 class="facts-title">Event facts</h2>
            <dl class="facts-list">
              <div class="fact-row"><dt>Date</dt><dd>${escapeText(event.date)}</dd></div>
              <div class="fact-row"><dt>Location</dt><dd>${escapeText(event.location)}</dd></div>
              <div class="fact-row"><dt>Status</dt><dd>${escapeText(event.status)}</dd></div>
              <div class="fact-row"><dt>Price</dt><dd>${escapeText(event.price)}</dd></div>
              <div class="fact-row"><dt>Category</dt><dd>${escapeText(event.category)}</dd></div>
            </dl>
            <div class="facts-actions">${registration}</div>
          </div>

          <div class="event-media">${image(event.image, event.title)}</div>
        </div>

        <section class="event-story" aria-label="Event details">
          <h2>About this activity</h2>
          <p>${escapeText(event.description)}</p>
          <h2>Why it matters</h2>
          <p>${escapeText(event.purpose)}</p>
          <div class="gallery">${galleryItems}</div>
        </section>`;
    } catch {
      showRetry(
        root,
        "This event could not load. It may not exist, or the events database is offline.",
        load,
      );
    }
  };

  load();
});
