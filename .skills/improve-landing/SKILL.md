---
name: improve-landing
description: Improve the effectiveness, content, layout, responsiveness, and measurement of the javisantana.com landing page using behavioral data from events.duckdb. Use when Codex is asked to redesign, optimize, evaluate, or iterate on landing.md or /landing.html so visitors quickly understand who Javi Santana is, what he does, and are encouraged to read his articles.
---

# Improve the landing page

Optimize for three outcomes, in order:

1. Explain who Javi is.
2. Explain what he does.
3. Help visitors find and read relevant articles.

Treat newsletter and social clicks as secondary outcomes.

## Work from the source

Inspect the repository before editing. Locate the source, layout, styles, tracking code, build
configuration, existing `landing_changes.md`, and any repository instructions. Do not assume
`landing.html` is hand-authored: this site currently generates `/landing.html` from `landing.md`.
Do not edit generated build output.

Preserve unrelated work in the dirty worktree. Do not commit or push unless the user explicitly
asks.

## Analyze the data first

Use the DuckDB CLI in read-only mode:

```sh
duckdb -readonly events.duckdb
```

The expected schema is:

```sql
CREATE TABLE events(ts VARCHAR, ip VARCHAR, ua VARCHAR, data JSON);
```

The JSON commonly contains `sessionId`, `path`, `type`, `referrer`, `viewportWidth`,
`progress`, `duration`, `maxProgress`, `reachedEnd`, `href`, and batched `events`.

If more than one database exists, compare file dates, sizes, row counts, and maximum timestamps.
Use the freshest canonical database without modifying any database. Never append URL-style
parameters such as `?access_mode=read_only` to a filename.

Use `json_extract_string` for scalar JSON values and `try_cast` for optional numbers:

```sql
SELECT
  try_cast(ts AS TIMESTAMPTZ) AS event_ts,
  json_extract_string(data, '$.sessionId') AS session_id,
  json_extract_string(data, '$.path') AS page_path,
  json_extract_string(data, '$.type') AS event_type,
  try_cast(json_extract_string(data, '$.viewportWidth') AS INTEGER) AS viewport_width
FROM events;
```

Avoid reserved aliases such as `type`, `ref`, and `day`. Prefer exact event-type equality over
substring matching. Treat `ts` as an ISO-8601 value and use `try_cast` or lexicographically safe
date boundaries instead of hard-coded “yesterday” filters.

### Establish a valid baseline

- Group events by `sessionId`; event rows are not visits.
- Filter to `/landing.html` and exclude NULL paths.
- Exclude localhost and `127.0.0.1` referrers from visitor metrics.
- Identify the current design's deployment date from Git history and compare only data collected
  while that version was live.
- Report sample sizes. Avoid strong conclusions from small segments.
- Do not expose or copy IP addresses, selected text, or other visitor-level data into logs.

Analyze at least:

- Sessions and acquisition source.
- Mobile versus desktop sessions.
- Median duration and maximum scroll depth.
- Section entry and footer/reached-end rates.
- Attributable article, newsletter, and social clicks.
- The most-read relevant articles over a recent, stated window.

Check measurement quality before interpreting clicks. In particular, verify that clicks on nested
elements resolve to the nearest anchor and record a stable label plus destination. Fix broken
instrumentation as part of the iteration when necessary.

## Form a hypothesis

Translate findings into a short design hypothesis before editing. Prefer changes supported by both
the behavioral data and the page's objectives.

Do not personalize layouts by referrer, viewport, or other segments unless the dataset has enough
traffic to justify the added complexity. Responsive design is required; source-specific content is
optional and must have a clear, measurable rationale.

Useful defaults for this site:

- Put the identity and value proposition in the first viewport.
- Put representative or popular writing before newsletter promotion.
- Reduce long, undifferentiated lists and excessive choice.
- Preserve the site's established visual language unless evidence supports replacing it.
- Use semantic HTML, visible keyboard focus, sufficient contrast, and reduced-motion-safe effects.
- Add stable `data-analytics` labels and named sections for each important interaction.

Verify current, time-sensitive biographical claims against an authoritative source before changing
them.

## Implement and validate

Keep landing-only styling scoped to a landing-page class so article layouts are not accidentally
changed. Reuse existing layouts and styles when practical.

Validate proportionally:

1. Build the Jekyll site.
2. Validate the generated `/landing.html`.
3. Check changed JavaScript syntax.
4. Verify featured internal links exist in the build output.
5. Inspect desktop and narrow/mobile renders for overflow, clipping, hierarchy, and readability.
6. Run `git diff --check` and review only the intended files.

Existing unrelated build warnings may be reported but should not be fixed without authorization.

### Archive the visual state before pushing

Before any push that includes landing-page changes, capture at least one full-page desktop
screenshot of the final validated `/landing.html` and save it in `landing_history_shots/`.

- Create the directory if it does not exist.
- Use a non-overwriting filename such as `YYYY-MM-DD-HHMM-iteration-slug.png`.
- Render the built site locally at a consistent desktop viewport; also archive a narrow/mobile
  screenshot when the responsive layout changed.
- Block or redirect the analytics endpoint during local capture so screenshots do not contaminate
  visitor data.
- Inspect the saved image for rendering failures before pushing.
- Include the screenshot in the same push as the landing changes so the repository preserves the
  page's visual history.

## Maintain the experiment log

Append every deployed iteration to `landing_changes.md`; do not overwrite prior entries. Include:

- Date and, once available, deployment timestamp or commit.
- Data window and exclusions.
- Baseline metrics with sample sizes.
- Evidence and hypothesis.
- Exact content, design, and instrumentation changes.
- Metrics to compare after deployment.

Make the next analysis able to distinguish pre-change and post-change sessions. If the change has
not been deployed yet, state that explicitly and leave a deployment timestamp placeholder rather
than guessing.
