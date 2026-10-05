/* Green Tomorrow - A2-2: registration-placeholder.html action checklist. */

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const root = document.querySelector("#registration-summary");

  const load = async () => {
    if (!id) {
      showState(root, "No event was selected. Open an activity from the events index first.");
      return;
    }
    showState(root, "Loading event…");
    try {
      const event = await api(`/api/events/${encodeURIComponent(id)}`);
      const media = event.image
        ? `<img src="${assetPath(event.image)}" alt="${escapeText(event.title)}" loading="lazy" decoding="async" data-fallback="IMAGE UNAVAILABLE">`
        : "";

      root.innerHTML = `
        <div class="checklist-head">
          <p class="eyebrow">Registration placeholder</p>
          <h1>Sign-up checklist: ${escapeText(event.title)}</h1>
          <p>Online registration is not connected yet. Use this checklist to prepare, then return to the activity page.</p>
        </div>

        <div class="checklist-meta">
          <span class="tag">${escapeText(event.category)}</span>
          <span class="tag ${statusClass(event.status)}">${escapeText(event.status)}</span>
          <span>${escapeText(event.date)}</span>
          <span>${escapeText(event.location)}</span>
        </div>

        <div class="checklist-grid">
          <section class="checklist">
            <h2>Items to bring</h2>
            <ul>
              <li>Reusable water bottle and a refillable mug.</li>
              <li>Weatherproof layers, sun hat and sunscreen.</li>
              <li>Sturdy closed-toe shoes for wet, uneven ground.</li>
              <li>Phone or notebook for recording observations.</li>
            </ul>
          </section>
          <section class="checklist">
            <h2>Safety notes</h2>
            <ul>
              <li>Stay with the group and follow the site coordinator.</li>
              <li>Never turn your back on the water or climb wet rocks alone.</li>
              <li>Use gloves for litter and report sharps to the coordinator.</li>
              <li>Check in on arrival so everyone is accounted for.</li>
            </ul>
          </section>
        </div>

        ${media ? `<div class="checklist-media">${media}</div>` : ""}

        <p class="checklist-actions">
          <a class="button secondary" href="event.html?id=${encodeURIComponent(event.id)}">Back to the event</a>
        </p>`;
    } catch {
      showRetry(
        root,
        "Event information could not load. It may not exist, or the events database is offline.",
        load,
      );
    }
  };

  load();
});
