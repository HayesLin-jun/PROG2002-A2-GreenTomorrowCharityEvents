/* Green Tomorrow - A2-2: search.html toolbar, pre-fill and index results. */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#search-form");
  const grid = document.querySelector("#results");
  const count = document.querySelector("#result-count");

  const load = async () => {
    showState(grid, "Loading activities…");
    count.textContent = "Loading activities…";
    const params = new URLSearchParams(new FormData(form));
    try {
      const events = await api(`/api/events/search?${params}`);
      count.textContent = `${events.length} ${events.length === 1 ? "activity" : "activities"} found`;
      grid.innerHTML = events.length
        ? events.map(card).join("")
        : `<div class="state" role="status">
             <img class="state-illustration" src="/assets/empty-state.svg" alt="" width="160" height="120">
             <p>No activities match these filters. Try another keyword, date or category.</p>
           </div>`;
    } catch {
      count.textContent = "Search unavailable";
      showRetry(
        grid,
        "The events database is offline, so results cannot load. Check that the database is running, then retry.",
        load,
      );
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    load();
  });

  form.addEventListener("reset", () => window.setTimeout(load, 0));

  /* Pre-fill the toolbar from the query string, so links such as
     search.html?category=Ocean load Ocean results straight away. */
  const incoming = new URLSearchParams(location.search);
  ["keyword", "date", "location", "category"].forEach((name) => {
    const control = form.elements[name];
    const value = incoming.get(name);
    if (control && value) control.value = value;
  });

  load();
});
