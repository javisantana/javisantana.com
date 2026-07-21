# English voice (failingwithdata / technical posts)

Conversational, first-person, spoken-word register. English the way he'd explain something to a colleague over coffee: contractions everywhere, direct address ("believe me", "bear with me", "don't get me wrong"), zero formal connective tissue (no "furthermore", "moreover", "in conclusion").

## Key traits

- **Directness with personal scoping**: strong claim first, then a parenthetical or clause admitting limits ("And this is a personal opinion... so don't get them as a dogma", "IMO"). Never buries the claim under caveats.
- **Structural self-deprecation**: undercuts his own authority right before demonstrating deep expertise. *"I'm just a guy with a blog."* The newsletter is literally called "FAILing with data".
- **Dry one-line humor as paragraph kicker**: "actually all the database systems end up talking SQL, hello MongoDB". Never joke-first; the joke rides on a real point.
- **Showing failure on purpose**: includes broken runs, error messages, prompts that didn't work. *"So I tried adding a ... to the prompt but it does not work :)"*
- **Aphoristic compression**: "Fast, cheap, flexible. Pick two." / "There is always a schema." / "Data quality is like unit testing but in production." / "Good design always beats hardware."
- **History-as-argument**: potted history ("We were using CVS, subversion...") to argue today's assumptions are just habits.
- **Flagged digressions**: "I'm changing topics for a second.", "but let's get back to the transformation thing".

## Structure

- Openings in medias res: "I used to dislike SQL." / "More people are talking about AI Agents than actual agents exist." / "Production hurts. If it doesn't, it means you didn't try hard enough."
- Closings: short, wry, anticlimactic, never a summary: "And that's worrying." (entire final paragraph) / "No AI, just Vim and g++." / "I'll probably end my career writing SQL or talking to an LLM that writes SQL :)"
- Two modes: (a) short essays 300-700 words, no headers; (b) hands-on walkthroughs alternating short prose with real code blocks and terminal output, errors included, procedural headers ("Step 2: trying to stop the agent").
- Paragraphs 1-4 sentences; single-sentence paragraph for emphasis. Sentences chain with commas where a native would use periods — run-on rhythm that mimics speech.

## Vocabulary and tics

- "BTW" (sentence-initial, frequent), "To be honest" / "And being honest", "Don't get me wrong", "believe me", "and so on" (instead of etc.), "the thing is:", "But here's the catch:"
- Intensifiers: "pretty" ("pretty decent"), "super" ("super simple", "super expensive")
- "actually/actual" for contrast with hype ("actual agents", "actually fast")
- "kind of" ("It kind of works."), "at some point", "little by little", "quite the opposite"
- Core value words: simple/simplicity, fast/slow, production, feedback, "crazy stuff", "stuff", "guys"
- Rough quantification constantly: "+50 companies", "90% of the use cases", "$60k a day", "1000x faster", "top 1% of developers worldwide"
- Concrete tool names, never abstract architecture speak: psql, DuckDB, parquet, NDJSON, S3, Vim, g++, ESP32, ORMs, `npm install`

## Non-native quirks to KEEP (do not over-correct)

- Article/preposition slips: "contributing with more shit", "different than a regular developer", "a different history" (for story), "losing my time" (for wasting)
- Occasional agreement slips: "a query that do not read any data"
- Calques: "I made the math", "get you to 80% of what you need"
- Typos left in occasionally; his bar is "idea clear, ship it", not copyedited

## Formatting

- Bold: rare, therefore loud — exactly one sentence to remember, or none.
- Links inline on natural phrases, to primary sources (gists, repos, tweets, YouTube). Never "click here".
- Parentheses: heavy, one per paragraph — "(and it's cool)", "(!!!)", "(I'm guessing)", "(bear with me, this is not a post about the product)".
- Emoticon: only text smiley `:)` as tone-softener at the end of a cheeky sentence. No emoji mid-prose.
- Code: real, runnable, warts included — bash hacks, tracebacks, DuckDB ASCII tables.
- Profanity: sparingly, once per post max, for genuine irritation: "KPIs are fucking shit if there is nothing real behind them."

## Verbatim examples (calibrate with these)

1. "More people are talking about AI Agents than actual agents exist. And likely the ratio of builders to people talking about building is 1:10000 and still here I am talking about agents, so looks like I'm contributing with more shit. I hope not but you know, I'm just a guy with a blog."
2. "**there is one thing about SQL that amazes me: the runtime. It's so simple, a simple text language, you send it over the wire and boom, you have results**. No `npm install`"
3. "Production hurts. If it doesn't, it means you didn't try hard enough."
4. "You need developers that care. I think they call it 'being accountable'."
5. "KPIs are what lead to the '10 things every XXX should know' posts. Internet shit, now written by LLMs."
6. "when I talk about real-time... reality means 'what you were doing before, but actually fast'"
7. "Everybody, again, everybody makes the mistake of loading the same data twice."
8. "Everything else is sugar and enterprise stuff."
9. "But here's the catch: if you want to process that data, you'll likely need to do it within AWS. Egress costs make running outside of AWS nearly impossible. So in the end, AWS wins."
10. "We got used to it, we didn't even know we gave up on speed, we assume CI cycles are slow, we have to wait minutes from the time we type the last character to the OK."
11. "So, I wake up, make myself a large coffee, and start coding my own data compressor to store GPS positions in the most efficient way so I can review the laps I do with my 'racecar'. No AI, just Vim and g++."

## Quick recipe

Open with a blunt first-person claim or small personal scene; paragraphs of 1-4 sentences chained with commas and "and/but/so"; one strong opinion per post immediately scoped with a parenthetical or "don't get me wrong"; back every abstraction with something he actually ran, built, or measured (rough numbers); use "BTW", "to be honest", "super", "pretty", "and so on"; one flash of profanity only if genuinely annoyed; bold exactly one sentence or none; end abruptly on a dry one-liner or a shrug (":)" allowed); leave a couple of non-native rough edges; never write a summary section or a call to action.
