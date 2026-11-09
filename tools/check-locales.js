#!/usr/bin/env node
/* Kontrollerar att alla språk är kompletta och att service workerns cachelista stämmer.
   Kör: node tools/check-locales.js   (avslutar med felkod 1 om något är fel) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const ctx = vm.createContext({});
const run = f => vm.runInContext(read(f), ctx, { filename: f });
const errors = [];
const err = m => errors.push(m);

run('js/i18n.js');
const localeFiles = fs.readdirSync(path.join(root, 'i18n')).filter(f => f.endsWith('.js')).sort();
localeFiles.forEach(f => run('i18n/' + f));
run('js/cards.js');
const IB = ctx.IB, CARDS = IB.CARDS, CATS = IB.CAT_ORDER, locales = IB.locales;

/* kort */
const ids = CARDS.map(c => c.id);
if (new Set(ids).size !== ids.length) err('Dubbla kort-id i cards.js');
CARDS.forEach(c => {
  if (!CATS.includes(c.k)) err(`Kort ${c.id}: okänd kategori ${c.k}`);
  if (typeof c.a !== 'string' || !c.a.trim() || c.a.includes('undefined')) err(`Kort ${c.id}: saknar giltig bild`);
});

/* språk */
if (!locales.en) err('Engelska saknas (reservspråk)');
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, p + k + '.') : [[p + k, v]]));
const holders = s => (String(s).match(/\{\w+\}/g) || []).sort().join(',');
const tagCount = (html, tag) => (html.match(new RegExp('<' + tag + '[\\s>]', 'g')) || []).length;
const refUi = Object.fromEntries(flat(locales.en.ui || {}));
const refHelp = locales.en.help.html;

Object.entries(locales).forEach(([code, L]) => {
  const at = m => err(`[${code}] ${m}`);
  if (!L.meta || !L.meta.name || !L.meta.htmlLang) at('meta.name och meta.htmlLang krävs');
  const ui = Object.fromEntries(flat(L.ui || {}));
  Object.keys(refUi).forEach(k => {
    if (typeof ui[k] !== 'string' || !ui[k].trim()) at(`ui.${k} saknas`);
    else if (holders(ui[k]) !== holders(refUi[k])) at(`ui.${k}: platshållare skiljer sig från engelska (${holders(ui[k])} mot ${holders(refUi[k])})`);
  });
  Object.keys(ui).forEach(k => { if (!(k in refUi)) at(`ui.${k} finns inte i engelska`); });
  CATS.forEach(k => { if (!L.cats || !L.cats[k]) at(`cats.${k} saknas`); });
  ['all', ...CATS].forEach(k => { if (!L.chips || !L.chips[k]) at(`chips.${k} saknas`); });
  ids.forEach(id => {
    const c = L.cards && L.cards[id];
    if (!c || !c.n || !c.n.trim() || !c.q || !c.q.trim()) at(`cards.${id}: namn eller fråga saknas`);
    else if (c.q.length > 90) at(`cards.${id}: frågan är ${c.q.length} tecken, håll den under 90`);
  });
  Object.keys(L.cards || {}).forEach(id => { if (!ids.includes(id)) at(`cards.${id} finns inte i cards.js`); });
  const html = L.help && L.help.html;
  if (!html) at('help.html saknas');
  else {
    ['h2', 'h3', 'p', 'ol', 'ul', 'li', 'code'].forEach(tag => {
      if (tagCount(html, tag) !== tagCount(refHelp, tag)) at(`help.html: antal <${tag}> skiljer sig från engelska`);
    });
    if (!html.includes('id="helph"')) at('help.html måste innehålla rubriken med id="helph"');
  }
});

/* service worker och index.html */
const shellSrc = /const SHELL = \[([\s\S]*?)\];/.exec(read('sw.js'));
const shell = shellSrc ? [...shellSrc[1].matchAll(/'([^']+)'/g)].map(m => m[1]) : [];
if (!shell.length) err('Hittar inte SHELL i sw.js');
shell.filter(f => f !== './').forEach(f => { if (!fs.existsSync(path.join(root, f))) err(`sw.js: ${f} finns inte`); });
const list = d => fs.readdirSync(path.join(root, d)).map(f => d + '/' + f);
const shouldCache = ['index.html', 'manifest.webmanifest', ...list('css'), ...list('js'), ...list('i18n'), ...list('fonts'), ...list('icons')]
  .filter(f => f !== 'icons/icon-maskable.svg');
shouldCache.forEach(f => { if (!shell.includes(f)) err(`sw.js: ${f} saknas i SHELL (fungerar inte offline)`); });
const index = read('index.html');
const scripts = [...index.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
localeFiles.forEach(f => { if (!scripts.includes('i18n/' + f)) err(`index.html: <script src="i18n/${f}"> saknas`); });
scripts.forEach(f => { if (!fs.existsSync(path.join(root, f))) err(`index.html: ${f} finns inte`); });

if (errors.length) {
  console.error(errors.map(e => '  FEL ' + e).join('\n'));
  console.error(`\n${errors.length} fel.`);
  process.exit(1);
}
console.log(`OK: ${CARDS.length} kort, ${Object.keys(locales).length} språk (${Object.keys(locales).join(', ')}), ${shell.length} filer i offline-cachen.`);
