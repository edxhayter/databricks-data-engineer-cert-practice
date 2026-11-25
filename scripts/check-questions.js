// Checks the question banks before publishing: node scripts/check-questions.js
// Saved progress is attached to question ids, so ids must be unique, well formed and never reused.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dir = path.join(__dirname, "..", "src", "questions");
const ctx = {};
vm.createContext(ctx);
for (const f of ["associate.js", "professional.js"]) vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
vm.runInContext("this.out = { BANK, PBANK, LINKS, BANK_STRETCH, PBANK_STRETCH }", ctx);
const { BANK, PBANK, LINKS, BANK_STRETCH, PBANK_STRETCH } = ctx.out;

const problems = [];
const check = (name, bank, prefix, sections, stretch) => {
  const seen = new Map(), texts = new Map();
  bank.forEach((q, i) => {
    const [id, sec, text, opts, expl, doc] = q;
    const where = `${name}[${i}] ${id}`;
    if (typeof id !== "string" || !new RegExp(`^${prefix}\\d{3,}$`).test(id)) problems.push(`${where}: id should look like ${prefix}001`);
    if (seen.has(id)) problems.push(`${where}: id already used at position ${seen.get(id)}`);
    seen.set(id, i);
    if (!Number.isInteger(sec) || sec < 1 || sec > sections) problems.push(`${where}: section ${sec} is out of range`);
    if (texts.has(text)) problems.push(`${where}: same question text as ${texts.get(text)}`);
    texts.set(text, id);
    if (!Array.isArray(opts) || opts.length !== 4 || new Set(opts).size !== 4) problems.push(`${where}: needs four distinct options`);
    if (!expl) problems.push(`${where}: missing explanation`);
    if (!(typeof doc === "string" && (/^https?:\/\//.test(doc) || (name === "BANK" && LINKS[doc])))) problems.push(`${where}: docs link "${doc}" isn't a URL or a known key`);
  });
  stretch.forEach((id) => { if (!seen.has(id)) problems.push(`${name} stretch list: ${id} isn't a question in the bank`); });
  console.log(`${name}: ${bank.length} questions, ids ${bank[0][0]}–${bank[bank.length - 1][0]}, ${stretch.length} tagged stretch`);
};
check("BANK", BANK, "A", 7, BANK_STRETCH);
check("PBANK", PBANK, "P", 9, PBANK_STRETCH);

if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n` + problems.join("\n"));
  process.exit(1);
}
console.log("All checks passed.");
