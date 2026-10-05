# A2-2 · Ocean Protection Page Features
## Subproject Information
- Direction: Ocean Protection (Discovery Workbench homepage)
- Port: 3202
- Database: charityevents_a (read-only)
- Important: A2 performs no database writes; A2 has no backend CRUD operations.

## Page List
| Page | File | Description |
| --- | --- | --- |
| index | `index.html` | Discovery Workbench homepage (filter panel + result grid) |
| search | `search.html` | Full filtering interface |
| event | `event.html` | Ocean event details (facts-first layout) |
| registration-placeholder | `registration-placeholder.html` | Reservation placeholder page |

> Differences from A2-1: A2-1 homepage uses mission-first narrative; A2-2 homepage is the Discovery Workbench, presenting filters and results above the fold with reduced narrative and stronger discovery focus. Search page implements multi-dimensional full filtering. Event page adopts facts-first, data-forward framework. Registration-placeholder follows the reserve-a-place structure.

---
## 1. index.html (Discovery Workbench)
- Data sources: `GET /api/events?category=Ocean` (loads ocean events on initial page load), `GET /api/categories`
- Page sections:
  1. Slim top brand bar: logo + one-line tagline *"Discover your next ocean action"*
  2. Filter panel (main above-the-fold content): categories (Ocean by default), keyword, date range, multi-select locations; "Apply Filters" button
  3. Result grid: 3-column cards, each with thumbnail, title, date, location, status badge, view details link
  4. Result count bar: displays number of matched results under current filters
  5. Sidebar recommendations: 1~2 featured ocean events
  6. Footer

- States:
  - loading: skeleton grid
  - error: filter failure prompt + retry button
  - empty: no matching events, prompt to "adjust filter criteria"

- Navigation links: Details → event.html?id=xx; Advanced filter → search.html; Featured events → event.html?id=xx
- Animation specs: Grid cards use GSAP `stagger` entrance animation; filter transitions use `to` fade; respects `prefers-reduced-motion: reduce` for graceful degradation.

## 2. search.html (Full Filter Interface)
- Data source: `GET /api/events?category=Ocean&keyword=&date=&location=`
- Page sections:
  1. Complete filter form: keyword, categories (Ocean / Community / Climate), start & end dates, multi-select locations, multi-select status, sorting (Latest / Popular / Spots Available)
  2. Selected filter tag bar: click tags to remove
  3. Result list: detailed cards (thumbnail + title + description summary + metadata + status + detail button)
  4. Pagination controls
  5. Empty result fallback

- States: loading / error / empty (copy emphasizes "No matching ocean events found")
- Navigation links: Details → event.html?id=xx; Return to index.html
- Animation specs: Fade in/out on filter change; staggered result rendering; reduced-motion degradation.

## 3. event.html (Ocean Event Details, facts-first)
- Data source: `GET /api/events/:id`
- Page sections:
  1. Fact header block: key metrics prioritized (sea area / species count / volunteer count / progress percentage), large prominent numerals
  2. Event hero image + title + category tag + status tag
  3. Data dashboard: progress bars, quota bars, timeline
  4. Event body: itinerary, notes & requirements
  5. Image gallery: 2~3 E-xx ocean images
  6. Registration entry: redirect to registration-placeholder.html
  7. Related events

- States: loading / error / empty
- Navigation links: Return to search.html; Register → registration-placeholder.html?id=xx; Related → event.html?id=yy
- Animation specs: Animated number counters with GSAP `counter`; progress bar `to` tween; reduced-motion fallback to static values.

## 4. registration-placeholder.html (Reserve-a-place Placeholder Page)
- Data source: `GET /api/events/:id`
- Page sections:
  1. Event summary: title, date, location, remaining spots
  2. Reservation notice: *"This demo site does not open registration. Head to Site A3 to reserve your spot."*
  3. Reservation button: redirect to A3 registration page (port 3101)
  4. Back to event details

- States: loading / error / empty
- Navigation links: Return to event.html?id=xx; Go to A3 → [http://localhost:3101/registration.html?id=xx](http://localhost:3101/registration.html?id=xx)
- Animation specs: Fade-in summary block; reduced-motion degradation.

---
## Page Navigation Flow
```
index.html (discovery workbench: filter + grid)
   │
   ├─▶ event.html?id=xx (facts-first)
   │         │
   │         ├─▶ registration-placeholder.html?id=xx (reserve-a-place)
   │         │         │
   │         │         └─▶ A3 (port 3101) registration
   │         │
   │         └─▶ Related event.html?id=yy
   │
   └─▶ search.html (full filter) ──┐
                                   │
                                   └─▶ event.html?id=xx
```

## API Route List (A2-2, Read-only GET only)
| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/events?category=Ocean` | Ocean event list |
| GET | `/api/events/:id` | Single event details |
| GET | `/api/categories` | Category list |
| GET | `/api/events/featured` | Featured ocean events (sidebar recommendation) |

## Boundary Statement
- A2-2 accesses `charityevents_a` in read-only mode and performs no writes.
- A2-2 has no backend CRUD capabilities.
- A2-2 imports no files from B / C.

