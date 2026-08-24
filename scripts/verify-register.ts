/**
 * Ukrainian and Russian readings address the reader formally.
 *
 * They were written informally and converted in bulk, which swapped the pronoun
 * and left twenty-four verbs in the singular — "Вы относишься", "Ви б'єшся".
 * That went unnoticed while a reading only appeared inside a result somebody had
 * asked for. They are published pages now, so the mismatch is checked.
 */
import ruPack from '../src/lib/interpret/copy.ru.json';
import ukPack from '../src/lib/interpret/copy.uk.json';

// JS word boundaries do not understand Cyrillic, so the ending has to be the
// last thing in the word — otherwise "лишається" reads as a second-person verb.
const CYR = '[\u0400-\u04FF]';
const END = `(?!${CYR})`;

const RULES: Record<string, RegExp> = {
  ru: new RegExp(`${CYR}{2,}(?:ешься|ишься|ёшься|ешь|ишь|ёшь)${END}|(?:^|${END})(?:тво[йяёеиюм]|теб[еяю]|тобой)${END}`, 'giu'),
  uk: new RegExp(`${CYR}{2,}(?:єшся|ешся|ишся|їшся|єш|иш)${END}|(?:^|${END})(?:тв[оі][йяєїм]|теб[еі]|тобою)${END}`, 'giu'),
};

const PACKS: Record<string, unknown> = { ru: ruPack, uk: ukPack };

let failed = 0;

for (const [locale, pack] of Object.entries(PACKS)) {
  const rule = RULES[locale]!;
  let checked = 0;
  for (const [kind, table] of Object.entries(pack as Record<string, unknown>)) {
    if (typeof table !== 'object' || table === null) continue;
    for (const [key, value] of Object.entries(table as Record<string, string>)) {
      checked += 1;
      const hits = [...new Set(String(value).match(rule) ?? [])];
      if (!hits.length) continue;
      failed += hits.length;
      console.log(`  ${locale}/${kind}/${key.padEnd(12)} <<< FAIL — informal: ${hits.join(', ')}`);
    }
  }
  console.log(`  ${locale}: ${checked} readings checked`);
}

console.log(
  failed === 0
    ? '\nPASS — every reading addresses the reader formally.'
    : `\nFAIL — ${failed} informal form(s).`,
);
process.exit(failed === 0 ? 0 : 1);
