-- ============================================================
-- PROG2002 Web Development II - Charity Events website
-- A2 project: A / A2-2  (Green Tomorrow - ocean theme)
-- Sample data for charityevents_db
--
-- Run schema.sql first, then this file.
--   mysql -u root -p < source/database/seed.sql
--
-- Contents: 4 categories, 3 charity organisations, 8 events.
-- ============================================================

USE charityevents_db;

SET NAMES utf8mb4;

-- Cleared child-first so the foreign keys stay valid on a re-import.
DELETE FROM events;
DELETE FROM categories;
DELETE FROM charities;

-- ------------------------------------------------------------
-- categories
-- ------------------------------------------------------------
INSERT INTO categories (id, name, description) VALUES
  (1, 'Forest', 'Woodland restoration and tree planting across shared green spaces.'),
  (2, 'Ocean', 'Shoreline, river and coastal clean-up for healthier water.'),
  (3, 'Wildlife', 'Habitat surveys that keep local species visible and protected.'),
  (4, 'Community', 'Neighbourhood action that makes conservation part of daily life.');

-- ------------------------------------------------------------
-- charities
-- ------------------------------------------------------------
INSERT INTO charities (id, name, slug, focus, email, city) VALUES
  (1, 'Green Tomorrow Trust', 'green-tomorrow-trust', 'Forest restoration', 'hello@greentomorrow.org', 'Green Valley'),
  (2, 'Blue Shore Alliance', 'blue-shore-alliance', 'Ocean clean-up', 'team@blueshore.org', 'East Coast'),
  (3, 'Green Tomorrow Volunteers', 'green-tomorrow-volunteers', 'Community action', 'volunteers@greentomorrow.org', 'North River');

-- ------------------------------------------------------------
-- events
-- category_id references categories.id, charity_id references charities.id
-- ------------------------------------------------------------
INSERT INTO events
  (id, title, category_id, charity_id, event_date, location, status, image, description, purpose, price, service_type)
VALUES
  (1, 'Tidepool Habitat Watch', 2, 2, '2026-10-12', 'Harbor Shoreline', 'upcoming', 'O-01.jpg',
   'Record tidepool species and help coastal teams track changing shoreline habitats.',
   'Protect tidepool life so shoreline species keep a safe place to recover.',
   'Free entry', NULL),
  (2, 'River Cleanup Day', 2, 2, '2026-10-19', 'North River', 'upcoming', 'O-02.jpg',
   'Remove litter and protect the river habitat with a guided community team.',
   'Keep the river mouth clean so ocean wildlife is not harmed by inland waste.',
   'Free · donations welcome', NULL),
  (3, 'Ocean Canopy Survey', 2, 2, '2026-11-02', 'Pine Ridge', 'upcoming', 'O-03.jpg',
   'Support a simple biodiversity survey and learn about local canopy health.',
   'Survey coastal cover so ocean habitats keep the shade and shelter they need.',
   'Free entry', NULL),
  (4, 'Coastal Conservation Walk', 2, 2, '2026-11-09', 'East Coast', 'upcoming', 'O-04.jpg',
   'Record shoreline conditions and share practical conservation actions.',
   'Document shoreline change so coastal habitats are protected before damage spreads.',
   'Suggested donation 50', NULL),
  (5, 'Community Tree Planting', 1, 1, '2026-11-21', 'Green Valley Park', 'ongoing', 'O-05.jpg',
   'Plant native trees with local volunteers and restore a shared woodland.',
   'Restore native woodland so local wildlife and families have a greener place to share.',
   'Free entry', NULL),
  (6, 'Community Food Forest Day', 4, 3, '2026-11-28', 'North River', 'upcoming', 'O-06.jpg',
   'Build a shared food forest with neighbours and learn low-cost growing skills.',
   'Grow free food together so every household can take part in local conservation.',
   'Free · donations welcome', NULL),
  (7, 'Wildlife Watch at Dawn', 3, 1, '2026-12-05', 'Green Valley Park', 'upcoming', 'O-07.jpg',
   'Join an early survey of birds and small mammals across the woodland edge.',
   'Count local species so habitat work keeps every coastal and woodland species in balance.',
   'Free entry', NULL),
  (8, 'Rockpool Wildlife Survey', 3, 2, '2026-12-12', 'East Coast', 'suspended', 'O-08.jpg',
   'Survey rockpool species and share findings with shoreline protection teams.',
   'Record rockpool wildlife so shoreline protection keeps fragile species safe.',
   'Free entry', NULL);
