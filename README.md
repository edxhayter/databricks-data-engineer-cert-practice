# Databricks Data Engineer Associate: Cram Drill

An unofficial, single-page practice drill for the **Databricks Certified Data Engineer Associate** exam. It has 278 multiple-choice questions with instant feedback, and questions you get wrong come back until you get them right.

**Live site:** https://edxhayter.github.io/databricks-data-engineer-cert-practice/

> Not affiliated with or endorsed by Databricks. These are practice questions written for study, not real exam questions. The Databricks documentation is the source of truth, so check anything important there.

## Who built it

The page, the question bank and this README were written by **Claude** (Anthropic's AI model, running in Claude Code). Edward Hayter, who was preparing for the exam, asked for the tool, answered the practice questions, pointed out the weak spots and asked for changes. The code and the questions are Claude's.

## Features

- **Drill mode.** Each answer gets instant feedback, a one-line explanation and a link to the relevant docs page. Option order is shuffled every time.
- **Misses repeat.** A wrong answer comes back 3–6 questions later and stays in rotation until you get it right twice more.
- **Filters.** Drill the whole bank, one exam section, or only your misses. Questions you haven't seen yet come first.
- **Timed 45.** A mock exam with the guide's section split (3 / 9 / 10 / 7 / 5 / 4 / 7), a 90-minute clock and no feedback until you submit. Its misses go back into drill mode.
- **Progress tracking.** Accuracy by section, pace (seconds per answer), and a "Copy misses" button that copies your weak spots as text.
- **Keyboard first.** Press `1`–`4` or `A`–`D` to answer, and `Enter` or `Space` for the next question.

Progress is saved in your browser's `localStorage`. It stays on your machine and isn't shared.

## Run it yourself

It's one self-contained HTML file. Its only external request is for Google Fonts, and it falls back to system fonts when offline.

- **Open it directly:** download `src/cram-drill.html` and open it in a browser.
- **Serve it locally:**
  ```bash
  python3 -m http.server 8000
  ```
  Then open http://localhost:8000 (the root `index.html` redirects to the drill).
- **Host it:** fork this repo and enable GitHub Pages (Settings → Pages → deploy from the `main` branch, root folder).

## How it was built

It was built over a few days of study sessions in Claude Code (26–30 October 2026). The process:

1. **Started from the official exam guide.** Claude extracted the text of the Databricks exam guide PDF (published 4 May 2026, updated 6 August 2026). The guide set the scope: 45 scored questions in 90 minutes, across seven sections weighted 6 / 21 / 22 / 16 / 10 / 10 / 15 %. Claude was told not to invent objectives that aren't in the guide.
2. **Set ground rules on sources.** Everything had to come from docs.databricks.com or Databricks Academy, not blogs or forums. Each key claim needed a doc page URL. Anything Claude couldn't confirm in the docs had to be flagged instead of guessed.
3. **Checked current product names.** Claude listed the renames the guide relies on: DLT → Lakeflow Declarative Pipelines, Workflows → Lakeflow Jobs, Asset Bundles → Declarative Automation Bundles, Repos → Git folders, and Shared / Single user → Standard / Dedicated access modes. This kept the questions from using outdated names.
4. **Ran mock exams in chat.** Claude ran two full 45-question mock exams interactively, logged the answers, allowed changes before submitting, and then marked them by section. The scores were 37/45 and 41/45. The misses were mainly Auto Loader defaults, which showed where to focus.
5. **Taught the weak areas and tested again.** This round produced a lesson on COPY INTO and Auto Loader schema evolution, a 10-question drill and a 5-question retest. After that came a cheat sheet of defaults and configuration options for every section, each row checked against a docs page.
6. **Moved to this page for speed.** Answering one question per chat message was too slow for cramming, so Claude built this page and the first 143 questions from the facts already checked.
7. **Added questions in batches.** Later batches covered AUTO CDC, Lakeflow Connect, pipeline modes and refreshes, task values and job parameters, Git folder operations, row filters and column masks, specific Unity Catalog privileges, and when to choose COPY INTO, Auto Loader or a Lakeflow Connect connector. Each batch started with Claude reading the relevant docs pages.
8. **Checked automatically before each publish.** Each build checked that:
   - every question has four options;
   - every question links to a docs page;
   - no question appears twice;
   - every docs URL returns HTTP 200;
   - the page's script passes a syntax check.

### Known limitations

- A few questions rest on Apache Spark or PySpark behaviour rather than a Databricks docs page:
  - `summary()` vs `describe()`;
  - `union` keeping duplicates;
  - `approx_count_distinct`;
  - disk spill.

  Their links point to the Apache Spark API docs or a general page.
- Databricks changes quickly, so defaults and preview features (marked Beta or Public Preview in the explanations) may have changed since October 2026.
- In one place the exam guide and the docs disagree. The guide talks about creating pull requests "using Databricks Git integration", while the Git folders docs say to open them in your Git provider. The question on this explains the difference.

## Files

- `index.html`: a redirect so the site root opens the drill.
- `src/cram-drill.html`: the whole app. The question bank is embedded as a JavaScript array: `[section, question, [correct, wrong, wrong, wrong], explanation, docKey]`. The correct option is listed first in the data and shuffled when shown.
- `README.md`: this file.
