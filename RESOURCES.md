# A2-2 · Ocean Protection Asset List (Green Tomorrow)
> Positioning: Ocean Discovery Desk
> Port: 3202
> Database: `charityevents_db` (All eight A2 subprojects share the course-specified database name; no database splitting)

## 1. Brand Assets
| Asset | Path | Usage | Dimension |
|---|---|---|---|
| Logo | `/assets/logo.svg` | Header brand mark | 160 × 40 |
| Favicon | `/assets/favicon.ico`, `/assets/favicon.svg` | Browser tab icon | 32 × 32 |
| OG Social Image | `/assets/og.jpg` | Social sharing preview | 1200 × 630 |
| Empty State Illustration | `/assets/empty-state.svg` | No matching results state | 320 × 240 |
| Admin Placeholder Graphic | `/assets/admin-placeholder.svg` | Reserved backend page | — |

## 2. Page Image Assignment
A2-1 retains the original `E-01` ~ `E-08` image set. This subproject uses independent naming `O-01` ~ `O-08`. **No image files are shared between the two projects** (0 out of 8 files have matching hashes in retest).

| ID | Path | Description | Usage | Dimension | License / Source |
|---|---|---|---|---|---|
| O-01 | `/assets/O-01.jpg` | Tide pool coastal wildlife | Index hero banner | 1600 × 900 | CC BY-SA 4.0 · Little Mountain 5 |
| O-02 | `/assets/O-02.jpg` | Volunteers cleaning river | Event card image | 1200 × 675 | Public domain · USEPA |
| O-03 | `/assets/O-03.jpg` | Coastal habitat survey | Event card image | 1200 × 675 | CC BY 3.0 US · Forest and Kim Starr |
| O-04 | `/assets/O-04.jpg` | Beach cleanup volunteers | Event card image | 1200 × 675 | Public domain · USEPA |
| O-05 | `/assets/O-05.jpg` | Volunteers transporting saplings | Event card image | 1200 × 675 | Public domain · USFWS/Southeast |
| O-06 | `/assets/O-06.jpg` | Community garden volunteers | Event card image | 1200 × 675 | Public domain · U.S. Air Force |
| O-07 | `/assets/O-07.jpg` | Child birdwatching with binoculars | Event card image | 1200 × 675 | Public domain · USFWS |
| O-08 | `/assets/O-08.jpg` | Rocky shore intertidal zone | Search page top banner / event graphic | 1200 × 675 | CC BY 2.0 · James St. John |

> All images sourced from Wikimedia Commons. The `events.image` field inside `source/database/seed.sql` maps directly to the filenames listed above. A2-2 will not reference any `E-0x` assets.

## 3. Third-party Libraries
This project **imports no frontend runtime third-party libraries**. Scaffold leftover files under `client/vendor/` (GSAP + ScrollTrigger) have been removed. All animations are implemented with native CSS / JavaScript.

## 4. Font Stack
```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
```

## 5. Colour Palette (CSS Variables)
| Variable | Value | Usage |
|---|---|---|
| `--primary` | `#0b777d` | Primary brand colour |
| `--primary-dark` | `#075a5f` | Hover / active states |
| `--dark` | `#12363a` | Dark block backgrounds |
| `--bg` | `#f1f8f7` | Page background |
| `--surface` | `#ffffff` | Card background |
| `--text` / `--muted` | `#12363a` / `#3f6b6f` | Body text / secondary text |
| `--line` | `#b8d5d1` | Divider lines |
| `--soft` | `#d8f0ec` | Light tint background |
| `--radius` | `8px` | Border radius |

> Refer to actual values defined in `client/css/styles.css` and `client/css/theme-a-ocean.css`.

## 6. Animation Constraints
- Allowed: Hover translation ≤4px, fade transitions
- Disabled: Parallax / marquee / shake / heavy scaling / infinite looping animations
- All animations respect `@media (prefers-reduced-motion: reduce)` and will be disabled as fallback

## 7. File Specifications
| Type | Files | Notes |
|---|---|---|
| CSS | `styles.css` / `home.css` / `search.css` / `event.css` / `theme-a-ocean.css` | No `@import` rules; `!important` only permitted for reduced-motion fallback |
| JS | `app.js` (global) + `home.js` / `search.js` / `event.js` / `registration.js` | Vanilla JavaScript, no build pipeline |
| Pages | `index.html` / `search.html` / `event.html` / `registration-placeholder.html` | No inline scripts |

## 8. Missing Assets TODO
- [x] `logo.svg`, `favicon.svg/ico`, `og.jpg`, `empty-state.svg`, `O-01.jpg` ~ `O-08.jpg` placed inside `source/assets/`
- [ ] MySQL connection variables (`DB_HOST` / `DB_USER` / `DB_PASSWORD`, see `.env.example`)
