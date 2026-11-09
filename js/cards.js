/* Kortlek: språkneutrala id, kategori och bild. Namn och frågor finns i i18n/<språk>.js.
   Ordningen här avgör hur korten delas ut mellan telefoner. Ändra den inte efter publicering. */
(() => {
'use strict';
/* Hjälpare för ritningarna */
const S=(x,y,s=9)=>`<path class="g" transform="translate(${x} ${y}) scale(${s/9})" d="M0-9Q2-2 9 0Q2 2 0 9Q-2 2-9 0Q-2-2 0-9Z"/>`;
const sword=()=>`<path class="t" d="M55 76V24L60 12l5 12v52z"/><path class="z" d="M60 26v44"/><rect class="g" x="42" y="76" width="36" height="7" rx="3"/><rect class="w" x="56" y="83" width="8" height="16" rx="2"/><circle class="g" cx="60" cy="104" r="5"/>`;
const pine=()=>`<rect class="w" x="-4" y="20" width="8" height="16"/><path class="f" d="M0-40L-18-8H-9L-26 22H26L9-8H18Z"/>`;
const ring=(cx,cy,ro,ri)=>`<path class="g" fill-rule="evenodd" d="M${cx-ro} ${cy}a${ro} ${ro} 0 1 0 ${ro*2} 0a${ro} ${ro} 0 1 0 ${-ro*2} 0zM${cx-ri} ${cy}a${ri} ${ri} 0 1 0 ${ri*2} 0a${ri} ${ri} 0 1 0 ${-ri*2} 0z"/>`;
const coin=(x,y)=>`<path class="g" d="M${x-18} ${y-7}V${y}A18 6 0 0 0 ${x+18} ${y}V${y-7}Z"/><ellipse class="g" cx="${x}" cy="${y-7}" rx="18" ry="6"/>`;
const link=()=>`<path class="t" fill-rule="evenodd" d="M26 44h16a16 16 0 0 1 0 32H26a16 16 0 0 1 0-32zM26 53h16a7 7 0 0 1 0 14H26a7 7 0 0 1 0-14z"/>`;
const SP="M60 60a4 4 0 0 1 8 0a8 8 0 0 1-16 0a12 12 0 0 1 24 0a16 16 0 0 1-32 0a20 20 0 0 1 40 0a24 24 0 0 1-48 0a28 28 0 0 1 56 0";

const ART = {
  hero: `<path class="a" d="M24 114c0-20 14-28 36-28s36 8 36 28z"/><path class="t" d="M38 62q0-28 22-28t22 28v22q0 8-8 8H46q-8 0-8-8z"/><rect class="k" x="42" y="60" width="36" height="7" rx="2"/><path class="z" d="M60 34v26M60 67v25"/><path class="a" d="M58 36q-10-16 6-24q14 8 4 24z"/>`,
  leader: `<path class="a" d="M26 112c0-22 15-32 34-32s34 10 34 32z"/><circle class="s" cx="60" cy="62" r="20"/><path class="p" d="M42 66q0 26 18 28q18-2 18-28q-6 12-18 12t-18-12z"/><path class="g" d="M40 46L38 24L52 36L60 18L68 36L82 24L80 46Z"/><circle class="k x" cx="53" cy="58" r="2.4"/><circle class="k x" cx="67" cy="58" r="2.4"/>`,
  wizard: `<path class="n" d="M26 114c0-20 14-30 34-30s34 10 34 30z"/><circle class="s" cx="60" cy="64" r="17"/><path class="p" d="M43 66q0 30 17 32q17-2 17-32q-8 12-17 12t-17-12z"/><path class="n" d="M38 50h44l-6 8H44z"/><path class="a" d="M46 50Q50 30 62 8Q70 28 74 50Z"/>${S(62,34,7)}<circle class="k x" cx="54" cy="63" r="2"/><circle class="k x" cx="66" cy="63" r="2"/>`,
  fairy: `<path class="p" d="M60 66C40 56 22 38 20 22 34 22 52 40 60 62z"/><path class="p" d="M60 66C80 56 98 38 100 22 86 22 68 40 60 62z"/><path class="p" d="M60 70C44 74 30 86 30 98 44 96 56 86 60 74z"/><path class="p" d="M60 70c16 4 30 16 30 28-14-2-26-12-30-24z"/><path class="a" d="M52 74h16l4 22H48z"/><circle class="s" cx="60" cy="62" r="9"/><path class="g" d="M51 58q9-14 18 0q-9-4-18 0z"/><path class="z" d="M72 82l16-16"/>${S(92,58,8)}`,
  dragon: `<path class="g" d="M50 46L40 22L62 40Z"/><path class="a" d="M20 88C20 56 44 40 66 44L100 52L104 64L88 66L92 74L72 78C60 96 36 104 20 88Z"/><path class="g" d="M104 58q10-8 14 2q-6-2-6 4q6 2 4 8q-8-2-12-4z"/><path class="p" d="M78 66l3 6 3-6zM90 65l3 6 3-6z"/><ellipse class="g" cx="64" cy="56" rx="6" ry="4.5"/><path class="z" d="M64 52v8"/><circle class="k x" cx="96" cy="57" r="1.8"/>`,
  wolf: `<path class="t" d="M26 28L36 56Q30 68 32 80Q40 106 60 106Q80 106 88 80Q90 68 84 56L94 28L70 42Q60 40 50 42Z"/><path class="b" d="M32 38l4 12 8-8zM88 38l-4 12-8-8z"/><ellipse class="g" cx="46" cy="64" rx="7" ry="4.5"/><ellipse class="g" cx="74" cy="64" rx="7" ry="4.5"/><path class="z" d="M46 60v8M74 60v8"/><path class="p" d="M46 82q14-6 28 0q-2 14-14 18q-12-4-14-18z"/><path class="k x" d="M54 84h12l-6 7z"/><path class="z" d="M60 91v6"/>`,
  gnome: `<path class="t" d="M30 114c0-18 12-24 30-24s30 6 30 24z"/><path class="p" d="M36 58C34 98 48 106 60 106S86 98 84 58Z"/><circle class="s" cx="60" cy="70" r="6"/><path class="a" d="M34 60Q38 24 72 12Q88 8 86 26Q82 42 86 60Z"/>`,
  witch: `<path class="n" d="M20 108c0-20 16-30 40-30s40 10 40 30z"/><circle class="f" cx="60" cy="66" r="17"/><path class="n" d="M32 52h56l-4 8H36z"/><path class="n" d="M44 52L62 10Q66 6 72 14L76 52Z"/><path class="a" d="M46.5 44h28.5l1 6H44z"/><circle class="g" cx="53" cy="65" r="3"/><circle class="g" cx="67" cy="65" r="3"/><path class="z" d="M60 66l-3 8h6"/><path class="z" d="M53 77q7 4 14 0"/>`,
  troll: `<circle class="f" cx="32" cy="60" r="6"/><circle class="f" cx="88" cy="60" r="6"/><path class="w" d="M22 114c0-24 16-34 38-34s38 10 38 34z"/><path class="f" d="M34 62q0-28 26-28t26 28q0 24-26 24t-26-24z"/><path class="z" d="M54 34l-2-8M60 33v-9M66 34l2-8"/><ellipse class="f" cx="60" cy="64" rx="7" ry="9"/><circle class="p" cx="48" cy="54" r="5"/><circle class="p" cx="72" cy="54" r="5"/><circle class="k x" cx="49" cy="55" r="2"/><circle class="k x" cx="71" cy="55" r="2"/><path class="z" d="M40 46l16 4M80 46l-16 4"/><path class="z" d="M46 76q14 8 28 0"/><path class="p" d="M50 77l3 9 3-8zM70 77l-3 9-3-8z"/>`,
  brave: `<path class="a" d="M60 12L100 24V58Q100 90 60 110Q20 90 20 58V24Z"/><path class="z hl" d="M60 20L92 30V58Q92 82 60 98Q28 82 28 58V30Z"/><path class="p" d="M60 30L67 45L83 47L71 58L75 74L60 65L45 74L49 58L37 47L53 45Z"/>`,
  cunning: `<path class="a" d="M16 18L44 36Q60 32 76 36L104 18L98 62Q88 96 60 108Q32 96 22 62Z"/><path class="b" d="M24 30l16 10-14 8zM96 30l-16 10 14 8z"/><path class="p" d="M22 62Q40 80 60 80Q80 80 98 62Q88 96 60 108Q32 96 22 62Z"/><path class="k x" d="M36 58q10-8 20 0q-10 7-20 0zM64 58q10-8 20 0q-10 7-20 0z"/><path class="z" d="M34 51l24 6M86 51l-24 6"/><circle class="k x" cx="60" cy="98" r="5"/><path class="z" d="M36 88H18M36 95l-16 4M84 88h18M84 95l16 4"/>`,
  afraid: `<circle class="s" cx="60" cy="62" r="34"/><circle class="p" cx="47" cy="56" r="9"/><circle class="p" cx="73" cy="56" r="9"/><circle class="k x" cx="47" cy="57" r="2.8"/><circle class="k x" cx="73" cy="57" r="2.8"/><path class="z" d="M38 44L54 38M82 44L66 38"/><ellipse class="k" cx="60" cy="84" rx="7" ry="8"/><path class="i" d="M98 36q6 10 0 14q-6-4 0-14z"/><path class="z" d="M14 50l-6 4 6 4M106 50l6 4-6 4"/>`,
  angry: `<path class="z" d="M26 28q-6-8 0-14M94 28q6-8 0-14"/><circle class="a" cx="60" cy="66" r="36"/><circle class="p" cx="46" cy="62" r="8"/><circle class="p" cx="74" cy="62" r="8"/><circle class="k x" cx="48" cy="64" r="3"/><circle class="k x" cx="72" cy="64" r="3"/><path class="k" d="M32 44l26 12-3 6-26-10zM88 44L62 56l3 6 26-10z"/><path class="z" stroke-width="4" d="M44 92q16-14 32 0"/>`,
  rest: `<path class="g" d="M60.5 20A40 40 0 1 0 98.54 70.72A32 32 0 1 1 60.5 20Z"/><path class="z" d="M27 68q6 6 12 0"/><path class="z" stroke-width="3" d="M80 28h14l-14 16h14M99 52h9l-9 11h9"/>${S(102,98,7)}${S(14,100,6)}${S(16,22,5)}`,
  absorbed: `<path class="z" stroke-width="10" d="${SP}"/><path class="z sa" stroke-width="5.5" d="${SP}"/>${S(22,24,9)}${S(100,94,8)}${S(98,28,6)}${S(22,96,6)}`,
  mine: `<path class="a" d="M44 32Q60 40 76 32L80 18Q60 28 40 18Z"/><path class="a" d="M46 36C20 62 14 90 34 104Q60 116 86 104C106 90 100 62 74 36Z"/><path class="g" d="M44 32h32l-2 10H46z"/><circle class="g" cx="60" cy="80" r="15"/><circle class="z" cx="60" cy="80" r="9"/><path class="z" d="M60 72v16"/>${S(100,30,8)}${S(20,44,6)}`,
  solution: `<g transform="rotate(-35 60 60)"><circle class="g" cx="60" cy="30" r="16"/><circle class="p" cx="60" cy="30" r="6"/><rect class="g" x="56" y="44" width="8" height="58" rx="2"/><path class="g" d="M64 84h14v8H64zM64 96h10v8H64z"/></g>`,
  insight: `<path class="g" d="M54 88h12l2 26H52z"/><ellipse class="g" cx="60" cy="52" rx="30" ry="38"/><ellipse class="i" cx="60" cy="52" rx="23" ry="31"/><path class="z hl" d="M46 40q4-10 14-12"/>${S(92,26,7)}`,
  treasure: `<path class="w" d="M20 58q0-28 40-28t40 28z"/><rect class="w" x="20" y="58" width="80" height="44" rx="4"/><path class="g" d="M20 58h80v8H20z"/><rect class="g" x="30" y="40" width="8" height="62"/><rect class="g" x="82" y="40" width="8" height="62"/><rect class="g" x="52" y="58" width="16" height="22" rx="3"/><circle class="k x" cx="60" cy="68" r="3"/>${S(16,22,7)}${S(104,24,8)}`,
  idea: `<g transform="rotate(35 60 60)"><rect class="w" x="55" y="34" width="10" height="78" rx="4"/><path class="g" d="M60 6l6 14 15 1-12 10 4 15-13-8-13 8 4-15-12-10 15-1z"/><path class="a" d="M55 56h10v6H55zM55 84h10v6H55z"/></g>${S(22,30,7)}${S(96,90,6)}`,
  decision: `<g transform="rotate(35 60 60)">${sword()}</g>${S(26,26,7)}`,
  mistake: `<path class="a" d="M60 38c-12-10-34-6-34 20 0 26 18 46 34 40 16 6 34-14 34-40 0-26-22-30-34-20z"/><path class="z" d="M60 38c0-8 2-14 8-20"/><path class="f" d="M62 28q12-12 24-6q-6 14-24 6z"/><circle class="p" cx="60" cy="72" r="11"/><circle class="k x" cx="55.5" cy="70" r="2.6"/><circle class="k x" cx="64.5" cy="70" r="2.6"/><path class="z" d="M56 80v-4M60 80v-4M64 80v-4"/>`,
  craft: `<rect class="w" x="52" y="8" width="16" height="10" rx="3"/><path class="i" d="M50 14H70V38L90 74Q96 96 60 96Q24 96 30 74L50 38Z"/><path class="a" d="M36 74Q60 66 84 74Q90 90 60 92Q30 90 36 74Z"/><circle class="p" cx="52" cy="82" r="3"/><circle class="p" cx="66" cy="79" r="2.4"/><circle class="p" cx="60" cy="52" r="3"/><circle class="p" cx="64" cy="62" r="2"/>`,
  promise: `${ring(60,76,28,18)}<path class="a" d="M48 50L54 34L66 34L72 50L60 62Z"/><path class="z hl" d="M54 42h12"/>${S(24,40,7)}${S(98,50,8)}`,
  storm: `<path class="g" d="M64 60L46 90H58L52 112L78 80H64L72 60Z"/><path class="t" d="M32 76a16 16 0 0 1 2-32a22 22 0 0 1 42-6a20 20 0 0 1 10 38z"/><path class="z" d="M26 88l-4 10M38 96l-4 10M88 88l-4 10M100 80l-4 10"/>`,
  lost: `<path class="z" d="M30 110h60"/><rect class="w" x="56" y="22" width="8" height="88"/><path class="a" d="M64 28h34l10 8-10 8H64z"/><path class="g" d="M56 54H24L12 62L24 70H56Z"/><path class="p" d="M64 76h26l8 7-8 7H64z"/><text class="qm" x="60" y="18" text-anchor="middle">?</text>`,
  party: `<path class="g" d="M98 44Q106 22 114 10Q114 34 106 52Z"/><path class="a" d="M12 54Q38 36 60 48Q82 36 108 54Q106 84 82 80Q68 78 60 68Q52 78 38 80Q14 84 12 54Z"/><ellipse class="k" cx="38" cy="60" rx="11" ry="6.5"/><ellipse class="k" cx="82" cy="60" rx="11" ry="6.5"/><path class="z hl" d="M22 52Q38 42 52 52M98 52Q82 42 68 52"/>${S(20,100,8)}${S(100,98,6)}${S(60,24,6)}`,
  turning: `<path class="a" d="M60 58C44 20 12 22 14 48 16 70 40 70 56 66z"/><path class="a" d="M60 58C76 20 108 22 106 48 104 70 80 70 64 66z"/><path class="b" d="M58 68C40 70 28 90 38 100 48 108 58 90 58 72z"/><path class="b" d="M62 68C80 70 92 90 82 100 72 108 62 90 62 72z"/><circle class="p" cx="34" cy="44" r="6"/><circle class="p" cx="86" cy="44" r="6"/><rect class="k" x="57" y="40" width="6" height="52" rx="3"/><path class="z" d="M58 42Q52 26 44 22M62 42Q68 26 76 22"/>`,
  standup: `<g transform="rotate(45 60 60)">${sword()}</g><g transform="rotate(-45 60 60)">${sword()}</g>${S(60,22,8)}`,
  surprise: `<path class="p" d="M8 62Q60 10 112 62Q60 114 8 62Z"/><circle class="a" cx="60" cy="62" r="22"/><circle class="k x" cx="60" cy="62" r="10"/><circle class="p x" cx="53" cy="55" r="4"/><path class="z" d="M60 16V6M30 30l-6-6M90 30l6-6"/>`,
  castle: `<rect class="t" x="30" y="52" width="60" height="52"/><path class="t" d="M44 52V44H52V52ZM68 52V44H76V52Z"/><rect class="t" x="16" y="38" width="22" height="66"/><rect class="t" x="82" y="38" width="22" height="66"/><path class="a" d="M12 40L27 12L42 40Z"/><path class="a" d="M78 40L93 12L108 40Z"/><path class="z" d="M27 12V3"/><path class="a" d="M27 3l12 4-12 4z"/><path class="n" d="M50 104V84Q60 68 70 84V104Z"/><rect class="g" x="24" y="56" width="6" height="12"/><rect class="g" x="90" y="56" width="6" height="12"/>`,
  darkwood: `<circle class="p" cx="94" cy="24" r="10"/><g transform="translate(30 66) scale(.85)">${pine()}</g><g transform="translate(90 68) scale(.85)">${pine()}</g><g transform="translate(60 62) scale(1.1)">${pine()}</g><path class="b x" d="M0 104H120V120H0Z"/><circle class="g x" cx="44" cy="96" r="2.2"/><circle class="g x" cx="50" cy="96" r="2.2"/>`,
  refuge: `<path class="t" d="M10 108Q14 44 60 34Q106 44 110 108Z"/><path class="n" d="M38 108Q38 66 60 64Q82 66 82 108Z"/><path class="p" d="M44 68l3 10 3-10zM68 66l3 12 3-12z"/><path class="g" d="M50 108l4-7 4 7zM64 108l3-6 3 6z"/>`,
  summit: `<circle class="g" cx="22" cy="26" r="8"/><path class="t" d="M4 108L44 34L84 108Z"/><path class="p" d="M44 34L32.6 55L39 50L45 57L51 51L55.3 55Z"/><path class="b" d="M50 108L88 46L116 108Z"/><path class="p" d="M88 46L77 64L83 60L89 66L94 60L96 64Z"/>`,
  tower: `<circle class="p" cx="96" cy="26" r="10"/>${S(22,30,7)}<path class="t" d="M42 110L46 40H74L78 110Z"/><path class="t" d="M40 40h40v6H40z"/><path class="a" d="M38 42L60 6L82 42Z"/><path class="g" d="M54 64q6-10 12 0v14H54z"/><path class="n" d="M52 110V94q8-10 16 0v16z"/><path class="z" d="M47 86h26"/>`,
  lake: `<circle class="g" cx="96" cy="26" r="9"/><path class="t" d="M0 62L26 34L50 62Z"/><path class="t" d="M36 62L72 26L110 62Z"/><rect class="i x" x="0" y="62" width="120" height="58"/><path class="z" d="M0 62H120"/><path class="z" d="M18 78q8-5 16 0t16 0M58 92q8-5 16 0t16 0M24 104q8-4 14 0t14 0"/><path class="z" d="M100 104V76M107 104V72M93 104V80"/><ellipse class="w" cx="100" cy="72" rx="3" ry="6"/><ellipse class="w" cx="107" cy="68" rx="3" ry="6"/>`,
  cabin: `<rect class="w" x="26" y="58" width="68" height="48"/><rect class="t" x="76" y="26" width="10" height="22"/><path class="a" d="M16 62L60 24L104 62Z"/><path class="n" d="M52 106V82q8-10 16 0v24z"/><rect class="g" x="32" y="70" width="14" height="14"/><path class="z" d="M39 70v14M32 77h14"/><path class="z" d="M81 20q-6-5 0-10q6-5 0-9"/>`,
  bridge: `<rect class="i x" x="0" y="84" width="120" height="36"/><path class="n" d="M34 84Q34 58 60 58Q86 58 86 84Z"/><path class="t" d="M6 46H114V84H86Q86 58 60 58Q34 58 34 84H6Z"/><rect class="t" x="6" y="38" width="108" height="8"/><path class="z" d="M6 66H34M86 66H114M20 46V66M100 46V66"/><circle class="g" cx="52" cy="76" r="3.5"/><circle class="g" cx="68" cy="76" r="3.5"/><path class="z" d="M10 102q8-4 16 0t16 0M70 108q8-4 16 0t16 0"/>`,
  celebration: `<path class="a" d="M60 52C60 52 36 36 38 24C40 14 54 14 60 26C66 14 80 14 82 24C84 36 60 52 60 52Z"/>${ring(46,82,24,15)}${ring(74,82,24,15)}`,
  curse: `<g transform="translate(-6 0) rotate(-14 34 60)">${link()}</g><g transform="translate(56 0) rotate(14 34 60)">${link()}</g>${S(59,60,11)}<path class="z" d="M58 38l-4-8M62 82l4 8"/>`,
  peace: `<circle class="g" cx="60" cy="74" r="28"/><path class="z" d="M60 28V14M28 40l-8-8M92 40l8-8M14 74H4M106 74h10"/><path class="f" d="M0 84Q30 70 60 84T120 84V120H0Z"/><path class="n" d="M46 98V78h6v-5h4v5h8v-5h4v5h6v20z"/>`,
  home: `<rect class="t" x="72" y="28" width="10" height="20"/><rect class="p" x="28" y="58" width="64" height="46"/><path class="a" d="M20 60L60 22L100 60Z"/><path class="p" d="M60 52C60 52 50 46 51 41C52 36 58 36 60 40C62 36 68 36 69 41C70 46 60 52 60 52Z"/><path class="w" d="M52 104V84q8-10 16 0v20z"/><rect class="g" x="34" y="68" width="12" height="12"/><rect class="g" x="74" y="68" width="12" height="12"/><path class="z" d="M52 104L40 118M68 104L80 118"/>`,
  share: `${[104,95,86,77,68].map(y=>coin(34,y)).join('')}${[104,95,86].map(y=>coin(86,y)).join('')}${S(60,46,10)}${S(86,60,6)}${S(34,48,6)}`,
};

const CAT_ORDER = ["persona", "trait", "deed", "moment", "place", "relief"];
const DECK = {
  "persona": [
   "hero",
   "leader",
   "wizard",
   "fairy",
   "dragon",
   "wolf",
   "gnome",
   "witch",
   "troll"
  ],
  "trait": [
   "brave",
   "cunning",
   "afraid",
   "angry",
   "rest",
   "absorbed",
   "mine"
  ],
  "deed": [
   "solution",
   "insight",
   "treasure",
   "idea",
   "decision",
   "mistake",
   "craft",
   "promise"
  ],
  "moment": [
   "storm",
   "lost",
   "party",
   "turning",
   "standup",
   "surprise"
  ],
  "place": [
   "castle",
   "darkwood",
   "refuge",
   "summit",
   "tower",
   "lake",
   "cabin",
   "bridge"
  ],
  "relief": [
   "celebration",
   "curse",
   "peace",
   "home",
   "share"
  ]
};

const IB = globalThis.IB = globalThis.IB || {};
IB.CAT_ORDER = CAT_ORDER;
IB.CARDS = CAT_ORDER.flatMap(k => DECK[k].map(id => ({ id, k, a: ART[id] })));
})();
