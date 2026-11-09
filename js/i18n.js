/* Språkmodul. Språkfiler i i18n/ registrerar sig med IB.registerLocale(kod, data).
   Engelska är reservspråk: saknas en nyckel i ett språk används den engelska texten. */
(() => {
'use strict';
const IB = globalThis.IB = globalThis.IB || {};
const locales = IB.locales = IB.locales || {};
const FALLBACK = 'en';
const KEY = 'icebreakers.lang';
let cur = FALLBACK;

IB.registerLocale = (code, data) => { locales[code] = data; };
IB.lang = () => cur;
IB.langExplicit = false;

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

IB.t = (key, vars) => {
  let s = get(locales[cur], key);
  if (typeof s !== 'string') s = get(locales[FALLBACK], key);
  if (typeof s !== 'string') return key;
  return vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : s;
};

IB.card = id => {
  const own = get(locales[cur], 'cards.' + id) || {};
  const fb = get(locales[FALLBACK], 'cards.' + id) || {};
  return { n: own.n || fb.n || id, q: own.q || fb.q || '' };
};

const store = {
  get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
  set(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* privat läge */ } }
};
const known = code => (code && locales[code] ? code : null);
const fromBrowser = () => {
  for (const l of (navigator.languages || [navigator.language || ''])) {
    const base = String(l).toLowerCase().split('-')[0];
    if (locales[base]) return base;
  }
  return null;
};

function applyStatic(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = IB.t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = IB.t(el.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      if (attr && key) el.setAttribute(attr.trim(), IB.t(key.trim()));
    });
  });
}
IB.applyStatic = applyStatic;

IB.setLang = (code, opts = {}) => {
  if (!locales[code]) code = FALLBACK;
  cur = code;
  if (opts.explicit) { IB.langExplicit = true; store.set(code); }
  const meta = locales[code].meta || {};
  document.documentElement.lang = meta.htmlLang || code;
  document.documentElement.dir = meta.dir || 'ltr';
  applyStatic();
  if (IB.onLang) IB.onLang(code);
};

/* Prioritet: språk i länken, sparat val, webbläsarens språk, engelska. */
IB.initLang = fromHash => {
  const h = known(fromHash), s = known(store.get());
  if (h || s) IB.langExplicit = true;
  IB.setLang(h || s || fromBrowser() || FALLBACK);
};
})();
