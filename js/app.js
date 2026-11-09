/* Icebreakers: kortmotor. Kort-id och ordning kommer från cards.js, all text från språkfilerna. */
(() => {
'use strict';
const IB = globalThis.IB;
const { CARDS, CAT_ORDER } = IB;
const $ = id => document.getElementById(id);
const t = (k, v) => IB.t(k, v);
const FILTERS = ['all', ...CAT_ORDER];

/* view: back | cards | end | over | ask */
const st = { filter: 'all', used: new Set(), busy: false, drawn: false, n: 1, pos: 1, np: 1, code: '', round: 0, view: 'back', shown: [] };
let PM = [];

function rng(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  let a = h;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; };
}
/* Samma kod och omgång ger samma uppdelning på alla telefoner, oavsett språk. */
function build() {
  const r = rng(st.code + '_round' + String(st.round).padStart(2, '0')), order = [];
  CAT_ORDER.forEach(k => {
    const ids = CARDS.map((c, i) => i).filter(i => CARDS[i].k === k);
    for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
    order.push(...ids);
  });
  PM = [];
  order.forEach((id, n) => { PM[id] = n % st.np; });
}
const clean = v => v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const pool = () => CARDS.map((c, i) => i).filter(i => PM[i] === st.pos - 1 && (st.filter === 'all' || CARDS[i].k === st.filter));
const avail = () => pool().filter(i => !st.used.has(i));
IB.pileIds = () => pool().map(i => CARDS[i].id);
const count = () => { $('count').textContent = t('ui.remaining', { n: avail().length, total: pool().length }); };

function backSVG() {
  let petals = '', dots = '';
  for (let i = 0; i < 8; i++) petals += `<ellipse class="ln" cx="0" cy="-40" rx="13" ry="30" transform="rotate(${i * 45})"/>`;
  for (let i = 0; i < 24; i++) dots += `<circle class="fl" cx="0" cy="-92" r="2.2" transform="rotate(${i * 15})"/>`;
  const star = (x, y) => `<path class="fl" transform="translate(${x} ${y})" d="M0-10Q2-2 10 0Q2 2 0 10Q-2 2-10 0Q-2-2 0-10Z"/>`;
  return `<svg viewBox="0 0 250 350" aria-hidden="true"><rect class="ln" x="12" y="12" width="226" height="326" rx="12"/><rect class="ln" x="20" y="20" width="210" height="310" rx="8"/><g transform="translate(125 160)">${petals}<circle class="ln" r="100"/>${dots}<circle class="fl" r="12"/></g>${star(44, 44)}${star(206, 44)}${star(44, 306)}${star(206, 306)}<text class="bt" x="125" y="300">${t('ui.backTitle')}</text><text class="bs" x="125" y="322">${t('ui.backSub')}</text></svg>`;
}
function setHand(n) {
  const h = $('hand'); st.view = 'back'; st.shown = []; h.dataset.n = n; h.innerHTML = '';
  for (let i = 0; i < n; i++) { const d = document.createElement('div'); d.className = 'card back'; d.innerHTML = backSVG(); h.appendChild(d); }
}
const paintBack = () => setHand(st.n);
function paintFront(el, idx) {
  const c = CARDS[idx], x = IB.card(c.id);
  el.className = 'card'; el.dataset.cat = c.k;
  el.innerHTML = `<div class="label"><i></i>${t('cats.' + c.k)}</div><div class="art"><svg viewBox="0 0 120 120" aria-hidden="true">${c.a}</svg></div><div class="name">${x.n}</div><div class="q">${x.q}</div>`;
}
function label() {
  if (st.view === 'over') return t('ui.drawOver');
  if (st.view === 'ask') return t('ui.drawAsk');
  if (st.drawn && avail().length === 0) return t('ui.drawEmpty');
  const two = st.n === 2;
  return st.drawn ? t(two ? 'ui.drawNextTwo' : 'ui.drawNext') : t(two ? 'ui.drawTwo' : 'ui.draw');
}

function panel(inner) { $('hand').innerHTML = `<div class="card end">${inner}</div>`; }
function panelEnd() {
  panel(`<div class="endt">${t('ui.endTitle')}</div><p>${t('ui.endText')}</p><div class="endb"><button type="button" class="draw" data-act="reshuffle">${t('ui.endShuffle')}</button><button type="button" class="chip" data-act="over">${t('ui.endQuit')}</button></div>`);
}
function panelOver() {
  panel(`<div class="endt">${t('ui.overTitle')}</div><p>${t('ui.overText')}</p><div class="endb"><button type="button" class="draw" data-act="reshuffle">${t('ui.overNew')}</button></div>`);
}
function panelAsk() {
  const prev = $('startcode') ? $('startcode').value : '';
  panel(`<div class="endt">${t('ui.askTitle')}</div><p>${t('ui.askText')}</p><input id="startcode" class="code" type="text" maxlength="16" placeholder="${t('ui.askPlaceholder')}" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="${t('ui.askLabel')}"><div class="endb"><button type="button" class="draw" data-act="start">${t('ui.askStart')}</button></div>`);
  const i = $('startcode'); i.value = prev;
  i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('hand').querySelector('[data-act="start"]').click(); } });
}
/* Ritar om det som syns i nuvarande språk, utan att tappa spelets läge. */
function render() {
  const hand = $('hand'), v = st.view;
  if (v === 'end') panelEnd();
  else if (v === 'over') panelOver();
  else if (v === 'ask') panelAsk();
  else [...hand.children].forEach((el, j) => {
    if (v === 'cards' && j < st.shown.length) paintFront(el, st.shown[j]);
    else { el.className = 'card back'; el.removeAttribute('data-cat'); el.innerHTML = backSVG(); }
  });
  $('draw').textContent = label(); count();
  $('rnd').textContent = t('ui.round', { n: st.round + 1 });
  $('helpbtn').textContent = t(document.body.classList.contains('help') ? 'ui.helpClose' : 'ui.help');
}
function showEnd() { st.view = 'end'; render(); $('live').textContent = t('ui.liveEnd'); }
function showOver() { st.view = 'over'; render(); $('live').textContent = t('ui.liveOver'); }
function showAsk() { st.view = 'ask'; render(); }

async function flip(el, idx, delay, calm) {
  if (calm) { paintFront(el, idx); return; }
  const a1 = el.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(90deg)' }], { duration: 130, delay, easing: 'ease-in', fill: 'both' });
  await a1.finished; paintFront(el, idx); a1.cancel();
  await el.animate([{ transform: 'rotateY(-90deg)' }, { transform: 'rotateY(0deg)' }], { duration: 220, easing: 'ease-out' }).finished;
}
async function draw() {
  if (st.view === 'ask') { const i = $('startcode'); if (i) i.focus(); return; }
  if (st.busy || st.view === 'end' || st.view === 'over') return;
  if (!avail().length) { showEnd(); return; }
  st.busy = true;
  const picked = [];
  for (let j = 0; j < st.n; j++) {
    const a = avail(); if (!a.length) break;
    const i = a[Math.floor(Math.random() * a.length)]; st.used.add(i); picked.push(i);
  }
  const hand = $('hand');
  if (hand.children.length !== st.n || hand.querySelector('.end')) setHand(st.n);
  for (let j = picked.length; j < st.n; j++) { const el = hand.children[j]; el.className = 'card back'; el.removeAttribute('data-cat'); el.innerHTML = backSVG(); }
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  await Promise.all(picked.map((i, j) => flip(hand.children[j], i, j * 110, calm)));
  st.view = 'cards'; st.shown = picked;
  $('live').textContent = picked.map(i => { const x = IB.card(CARDS[i].id); return `${x.n}. ${x.q}`; }).join(' ');
  st.drawn = true; $('draw').textContent = label(); count(); st.busy = false;
}
function reshuffle() {
  if (st.busy) return;
  if (st.np > 1) st.round = (st.round + 1) % 100;
  build(); st.used.clear(); st.drawn = false; paintBack(); syncPlayersUI();
  $('draw').textContent = label(); count(); hashSync(); $('live').textContent = t('ui.liveShuffled');
}
function setMode(n) {
  if (st.busy) return;
  st.n = n; st.drawn = false; paintBack();
  document.querySelectorAll('.segb').forEach(b => b.setAttribute('aria-pressed', +b.dataset.n === n));
  $('draw').textContent = label(); count(); hashSync();
}

/* Länkformat: #code-pizza-players-3-pos-2-round-1-two-lang-en. Gamla svenska nycklar läses fortfarande. */
const KV = { code: 'code', kod: 'code', round: 'round', omgang: 'round', players: 'players', spelare: 'players', pos: 'pos', plats: 'pos', lang: 'lang', sprak: 'lang' };
function parseHash(h) {
  const out = {}, tk = h.replace(/^#/, '').toLowerCase().split('-').filter(Boolean);
  for (let i = 0; i < tk.length; i++) {
    const k = tk[i];
    if (KV[k] && i + 1 < tk.length) out[KV[k]] = tk[++i];
    else if (k === 'two') out.two = true;
    else if (k === 'tva' && tk[i + 1] === 'kort') { out.two = true; i++; }
  }
  return out;
}
function hashSync() {
  const h = [
    st.code ? 'code-' + st.code : '',
    st.np > 1 && st.round ? 'round-' + st.round : '',
    st.np > 1 ? 'players-' + st.np : '',
    st.np > 1 ? 'pos-' + st.pos : '',
    st.n === 2 ? 'two' : '',
    IB.langExplicit ? 'lang-' + IB.lang() : ''
  ].filter(Boolean).join('-');
  if (h === location.hash.replace(/^#/, '')) return;
  try { history.replaceState(null, '', h ? '#' + h : location.pathname + location.search); } catch (e) { /* ignoreras */ }
}
function syncPlayersUI() {
  document.querySelectorAll('.npb').forEach(b => b.setAttribute('aria-pressed', +b.dataset.np === st.np));
  document.querySelectorAll('.posb').forEach(b => { const k = +b.dataset.pos; b.hidden = k > st.np; b.setAttribute('aria-pressed', k === st.pos); });
  $('posrow').hidden = st.np < 2; $('coderow').hidden = st.np < 2;
  $('rnd').textContent = t('ui.round', { n: st.round + 1 });
}
function restart() { build(); st.used.clear(); st.drawn = false; paintBack(); syncPlayersUI(); $('draw').textContent = label(); count(); hashSync(); }
function setCode(v) { if (st.busy) return; st.code = clean(v); st.round = 0; $('code').value = st.code; restart(); if (st.np > 1 && !st.code) showAsk(); }
function setPos(k) { if (st.busy) return; st.pos = k; restart(); }
function setPlayers(np) { if (st.busy) return; st.np = np; if (st.pos > np) st.pos = 1; restart(); if (np > 1 && !st.code) showAsk(); }

function buildChips() {
  const box = $('chips');
  if (!box.children.length) FILTERS.forEach(key => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.dataset.key = key;
    if (key !== 'all') b.dataset.cat = key;
    b.addEventListener('click', () => {
      st.filter = key;
      box.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b));
      $('draw').textContent = label(); count();
    });
    box.appendChild(b);
  });
  box.querySelectorAll('.chip').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.key === st.filter);
    b.innerHTML = `<i></i>${t('chips.' + b.dataset.key)}`;
  });
}
function buildLangSelect() {
  const sel = $('lang');
  Object.keys(IB.locales).forEach(code => {
    const o = document.createElement('option');
    o.value = code; o.textContent = IB.locales[code].meta.name; sel.appendChild(o);
  });
  sel.addEventListener('change', () => IB.setLang(sel.value, { explicit: true }));
}
IB.onLang = code => { $('lang').value = code; buildChips(); render(); hashSync(); };

/* Regler och helskärm */
function setHelp(on) {
  document.body.classList.toggle('help', on); $('help').hidden = !on;
  $('helpbtn').setAttribute('aria-expanded', on); $('helpbtn').textContent = t(on ? 'ui.helpClose' : 'ui.help');
  window.scrollTo(0, 0);
  if (on) $('helph').focus(); else $('helpbtn').focus();
}
let wake = null;
async function setFull(on) {
  document.body.classList.toggle('full', on); $('full').setAttribute('aria-pressed', on);
  if (on) {
    try { await document.documentElement.requestFullscreen(); } catch (e) { /* stöds inte överallt */ }
    try { wake = await navigator.wakeLock.request('screen'); } catch (e) { wake = null; }
  } else {
    try { if (document.fullscreenElement) await document.exitFullscreen(); } catch (e) { /* ignoreras */ }
    try { if (wake) { await wake.release(); wake = null; } } catch (e) { /* ignoreras */ }
  }
}

$('draw').addEventListener('click', draw);
$('stage').addEventListener('click', e => { if (e.target.closest('.end')) return; draw(); });
$('stage').addEventListener('keydown', e => { if (e.target !== $('stage')) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); draw(); } });
$('hand').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  if (act === 'reshuffle') reshuffle();
  else if (act === 'over') showOver();
  else if (act === 'start') { const v = clean($('startcode').value); if (!v) { $('startcode').focus(); return; } setCode(v); }
});
$('shuffle').addEventListener('click', reshuffle);
$('helpbtn').addEventListener('click', () => setHelp(!document.body.classList.contains('help')));
$('helpclose').addEventListener('click', () => setHelp(false));
$('full').addEventListener('click', () => setFull(true));
$('exit').addEventListener('click', () => setFull(false));
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (document.body.classList.contains('help')) setHelp(false);
  if (document.body.classList.contains('full')) setFull(false);
});
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && document.body.classList.contains('full')) setFull(false); });
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && document.body.classList.contains('full') && !wake) { try { wake = await navigator.wakeLock.request('screen'); } catch (e) { /* ignoreras */ } }
});
document.querySelectorAll('.segb').forEach(b => b.addEventListener('click', () => setMode(+b.dataset.n)));
document.querySelectorAll('.npb').forEach(b => b.addEventListener('click', () => setPlayers(+b.dataset.np)));
document.querySelectorAll('.posb').forEach(b => b.addEventListener('click', () => setPos(+b.dataset.pos)));
$('code').addEventListener('change', e => setCode(e.target.value));

/* Start */
const H = parseHash(location.hash);
if (H.two) st.n = 2;
if (H.code) st.code = clean(H.code);
if (/^\d{1,2}$/.test(H.round || '')) st.round = +H.round;
if (/^[2-4]$/.test(H.players || '')) st.np = +H.players;
if (/^[1-4]$/.test(H.pos || '') && +H.pos <= st.np) st.pos = +H.pos;
$('code').value = st.code;
document.querySelectorAll('.segb').forEach(b => b.setAttribute('aria-pressed', +b.dataset.n === st.n));
build(); syncPlayersUI(); setHand(st.n); buildLangSelect();
IB.initLang(H.lang);
if (st.np > 1 && !st.code) showAsk();
})();
