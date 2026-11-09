# Databricks Data Engineer Practice: Associate and Professional

An unofficial, single-page practice drill for two Databricks certifications. A toggle in the header switches between them:

| Exam | Questions in the bank | Timed mock |
|---|---|---|
| Data Engineer **Associate** (guide of 4 May 2026, updated 6 Aug 2026) | 278 | 45 questions, 90 minutes |
| Data Engineer **Professional** (guide of 9 Oct 2026) | 200 | 60 questions, 120 minutes |

Every question has instant feedback. Each question is also a plant in a knowledge garden: each correct answer grows it one stage from a seed to a bloom, a wrong answer resets it, and blooms come back now and then to check they've stuck.

**Live site:** https://edxhayter.github.io/databricks-data-engineer-cert-practice/src/practice.html

> Not affiliated with or endorsed by Databricks. These are practice questions written for study, not real exam questions. The Databricks documentation is the source of truth, so check anything important there.

## Who built it

The page, the question bank and this README were written by **Claude** (Anthropic's AI model, running in Claude Code). Edward Hayter, who was preparing for the exams, asked for the tool, answered the practice questions, pointed out the weak spots and asked for changes. The code and the questions are Claude's.

## Features

- **Drill mode.** Each answer gets instant feedback, a one-line explanation and a link to the relevant docs page. Option order is shuffled every time.
- **Knowledge garden.** Every question is a plant with six stages:

  | Stage | How it gets there | Comes back after |
  |---|---|---|
  | Not rooted yet | answered, but not yet correctly | 3–6 questions |
  | 1 Seed | first correct answer | about 5 questions |
  | 2 Sprout | second correct answer | about 15 |
  | 3 Seedling | third correct answer | about 40 |
  | 4 Bud | fourth correct answer | about 80 |
  | 5 Bloom | fifth correct answer | rechecked about every 150 |

  - **Every correct answer grows the plant one stage.** The widening gaps only decide when a question comes back, so a plant isn't asked again straight away.
  - **A wrong answer resets it.** Any stage, bloom included, goes back to "not rooted yet". The question comes back 3–6 questions later and stays in rotation until you get it right twice more.
  - **"I guessed".** After a lucky correct answer, press `G` or the button. The plant doesn't grow and the question comes back soon.
  - **What comes next.** About two picks in three are plants that are due back, longest overdue first. The rest are new questions, and blooms come back when their recheck is due.
  - **Garden view.** Every question in the bank laid out by section, so you can see weak sections at a glance. Click any plant to practise that question.
- **Filters.** Drill the whole bank, one exam section, or only your misses.
- **Timed mock.** Associate: 45 questions in 90 minutes, split 3 / 9 / 10 / 7 / 5 / 4 / 7 by section. Professional: 60 questions in 120 minutes, split 14 / 7 / 7 / 6 / 9 / 5 / 3 / 6 / 3. No feedback until you submit, and the misses go back into drill mode. The mock doesn't grow or reset plants.
- **Separate progress per exam.** Each exam keeps its own history, misses and section stats.
- **Progress tracking.** Garden stages by section, pace (seconds per answer), and a "Copy misses" button that copies your weak spots as text.
- **Keyboard first.** Press `1`–`4` or `A`–`D` to answer, `Enter` or `Space` for the next question, and `G` if you guessed.

Progress is saved in your browser's `localStorage`. It stays on your machine and isn't shared.

## Run it yourself

It's one self-contained HTML file. Its only external request is for Google Fonts, and it falls back to system fonts when offline.

- **Open it directly:** download `src/practice.html` and open it in a browser.
- **Serve it locally:**
  ```bash
  python3 -m http.server 8000
  ```
  Then open http://localhost:8000 (the root `index.html` redirects to the drill).
- **Host it:** fork this repo and enable GitHub Pages (Settings → Pages → deploy from the `main` branch, root folder).

## How it was built

It was built over several study sessions in Claude Code (26 October to 5 November 2026). The Associate process:

1. **Started from the official exam guide.** Claude extracted the text of the Databricks exam guide PDF (published 4 May 2026, updated 6 August 2026). The guide set the scope: 45 scored questions in 90 minutes, across seven sections weighted 6 / 21 / 22 / 16 / 10 / 10 / 15 %. Claude was told not to invent objectives that aren't in the guide.
2. **Set ground rules on sources.** Everything had to come from docs.databricks.com or Databricks Academy, not blogs or forums. Each key claim needed a doc page URL. Anything Claude couldn't confirm in the docs had to be flagged instead of guessed.
3. **Checked current product names.** Claude listed the renames the guide relies on: DLT → Lakeflow Declarative Pipelines, Workflows → Lakeflow Jobs, Asset Bundles → Declarative Automation Bundles, Repos → Git folders, and Shared / Single user → Standard / Dedicated access modes. This kept the questions from using outdated names.
4. **Ran mock exams in chat.** Claude ran two full 45-question mock exams interactively, logged the answers, allowed changes before submitting, and then marked them by section. The scores were 37/45 and 41/45. The misses were mainly Auto Loader defaults, which showed where to focus.
5. **Taught the weak areas and tested again.** This round produced a lesson on COPY INTO and Auto Loader schema evolution, a 10-question drill and a 5-question retest. After that came a cheat sheet of defaults and configuration options for every section, each row checked against a docs page.
6. **Moved to this page for speed.** Answering one question per chat message was too slow for quick revision, so Claude built this page and the first 143 questions from the facts already checked.
7. **Added questions in batches.** Later batches covered AUTO CDC, Lakeflow Connect, pipeline modes and refreshes, task values and job parameters, Git folder operations, row filters and column masks, specific Unity Catalog privileges, and when to choose COPY INTO, Auto Loader or a Lakeflow Connect connector. Each batch started with Claude reading the relevant docs pages.
8. **Checked automatically before each publish.** Each build checked that:
   - every question has four options;
   - every question links to a docs page;
   - no question appears twice;
   - every docs URL returns HTTP 200;
   - the page's script passes a syntax check.

### Adding the Professional exam

9. **Started again from the Professional exam guide.** Claude extracted the text of the guide PDF (published 9 October 2026): 60 scored questions in 120 minutes across nine sections weighted 23 / 12 / 12 / 10 / 15 / 8 / 5 / 10 / 5 %. The 200 questions follow those weights: 46 / 24 / 24 / 20 / 30 / 16 / 10 / 20 / 10.
10. **Researched in parallel.** Claude split the nine sections across six sub-agents. Each one got the guide's objectives for its sections word for word and the same rules:
    - write a question only when a docs page fetched during the task confirms the answer;
    - cite that page;
    - use current product names;
    - avoid answers that give themselves away;
    - don't copy the guide's sample questions.

    Each agent also reported what it couldn't confirm and left out.
11. **Checked the merged bank.** Claude checked that:
    - there are 200 questions with the right count per section;
    - each question has four distinct options and no question appears twice;
    - no correct answer gives itself away by length or "because" wording;
    - all 113 cited docs URLs return HTTP 200.

    It then clicked through both exams in a browser.
12. **Replaced the miss queue with a knowledge garden.** Edward suggested the idea: a correct answer seeds a question, later correct answers grow it, it blooms at five, and blooms are retested in case they need resetting. Claude added the rules that make it spaced repetition rather than raw repetition: growth gaps that widen with each stage, a two-stage drop for wrong answers, and an "I guessed" button. Existing browser progress converts on first load. Questions already right more often than wrong start as sprouts, other correct ones as seeds, and current misses as "not rooted yet". Claude tested it by simulating 1,500 answers with 10% wrong on the Professional bank. All 200 questions moved from seed to bloom in about 1,200 answers, and no stage was starved. It then checked the garden view, the guess button and phone layout in a browser.
13. **Simplified the growth rules.** After trying it, Edward found that holding back growth until enough questions had passed didn't match the original idea. The rules now follow it: every correct answer grows a plant one stage, and any wrong answer resets it to the start. The widening gaps stay, but only to space out when a question comes back.

### Known limitations

- A few questions rest on Apache Spark or PySpark behaviour rather than a Databricks docs page:
  - `summary()` vs `describe()`;
  - `union` keeping duplicates;
  - `approx_count_distinct`;
  - disk spill.

  Their links point to the Apache Spark API docs or a general page.
- Databricks changes quickly, so defaults and preview features (marked Beta or Public Preview in the explanations) may have changed since October 2026.
- Professional gaps the research agents reported, where the docs didn't confirm enough to write questions:
  - tokenisation (anonymisation is covered through hashing and generalisation);
  - Databricks SDK examples for monitoring runs;
  - Kafka and Kinesis starting-offset defaults;
  - Iceberg as an AUTO CDC target;
  - metric view join syntax.
- `assertDataFrameEqual` / `assertSchemaEqual` and default window frames cite the Apache Spark docs.
- The current docs call Delta Sharing **OpenSharing** and the Delta cache the **disk cache**, so the questions use those names.
- In one place the Associate exam guide and the docs disagree. The guide talks about creating pull requests "using Databricks Git integration", while the Git folders docs say to open them in your Git provider. The question on this explains the difference.

## Files

- `index.html`: a redirect so the site root opens the drill.
- `src/practice.html`: the whole app. The question bank is embedded as a JavaScript array: `[section, question, [correct, wrong, wrong, wrong], explanation, docKey or docs URL]`, with one bank per exam. The correct option is listed first in the data and shuffled when shown.
- `README.md`: this file.
