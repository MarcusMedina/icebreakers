# Icebreakers

A conversation starter for people who find it hard to begin. Draw a card, then share something that fits the picture and the question.
Installable PWA, works offline, no tracking and no external requests (fonts are bundled).

Languages: Swedish and English. The app picks the language from the link, then a saved choice, then the browser, then English.

## Deploy on GitHub Pages

Copy the files into your clone of this repository (the zip does not contain a LICENSE, so yours is kept):

```bash
git clone git@github.com:<user>/icebreakers.git
cd icebreakers
# unzip icebreakers-pwa.zip here, then:
node tools/check-locales.js
git add .
git commit -m "Icebreakers PWA with Swedish and English"
git push
```

Then enable Pages: repository → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
The app is served at `https://<user>.github.io/icebreakers/`.

## Structure

```
index.html              markup only, all text comes from the language files
css/style.css           styling and bundled font faces
js/i18n.js              language registry, detection, t()
js/cards.js             card ids, categories and artwork (language neutral)
js/app.js               the card engine
i18n/sv.js, i18n/en.js  all text per language: UI, rules, card names and questions
sw.js                   service worker (offline cache)
tools/check-locales.js  consistency check for languages and the offline file list
```

## Add a language

1. Copy `i18n/en.js` to `i18n/<code>.js` (for example `de.js`) and change the code in `IB.registerLocale("de", ...)`.
2. Translate every value. Keep placeholders such as `{n}` and `{total}`, and keep the HTML structure of `help.html`.
3. Add `<script src="i18n/de.js"></script>` to `index.html` after the other language files.
4. Add `'i18n/de.js'` to `SHELL` in `sw.js` and raise `VERSION`.
5. Run `node tools/check-locales.js`. It fails if a card, a key or a placeholder is missing, or if a file is missing from the offline cache.

The language appears in the selector automatically. Missing texts fall back to English.

## Playing on several phones

Everyone picks the same game code and their own position. The deal is based on card ids, so players can use different languages and still get separate cards.
Ready-made links: `#code-pizza-players-3-pos-2`. Add `-two` for two cards per draw and `-lang-en` to force a language.

## Updating

Raise `VERSION` in `sw.js` whenever any file changes, otherwise installed apps keep serving the old files from the cache.
Do not reorder `js/cards.js` after the game is in use: the order decides how cards are dealt between phones.
