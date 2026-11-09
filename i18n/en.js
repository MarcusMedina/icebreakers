/* English. This is the fallback language: every key must exist here. */
IB.registerLocale("en", {
  meta: { name: "English", htmlLang: "en", dir: "ltr" },
  ui: {
    "help": "Rules",
    "helpClose": "Close",
    "helpBack": "Back to the game",
    "stageLabel": "Draw a card",
    "draw": "Draw card",
    "drawTwo": "Draw two cards",
    "drawNext": "Draw next card",
    "drawNextTwo": "Draw two new cards",
    "drawEmpty": "Out of cards",
    "drawAsk": "Enter a word first",
    "drawOver": "Game over",
    "remaining": "{n} of {total} left",
    "round": "Round {n}",
    "code": "Game code",
    "codePlaceholder": "shared word",
    "players": "Players",
    "playersLabel": "Number of players",
    "position": "Your position",
    "perDraw": "Cards per draw",
    "perDrawLabel": "Number of cards per draw",
    "chipsLabel": "Which cards should be drawn?",
    "shuffle": "Reshuffle the pile",
    "fullscreen": "Fullscreen",
    "exitFull": "Exit fullscreen",
    "language": "Language",
    "backTitle": "Break the ice…",
    "backSub": "Tap to draw",
    "endTitle": "Out of cards",
    "endText": "Want to reshuffle the pile and keep playing?",
    "endShuffle": "Reshuffle",
    "endQuit": "Finish",
    "overTitle": "Game over",
    "overText": "Thanks for the conversations!",
    "overNew": "New game",
    "askTitle": "Pick a word",
    "askText": "All players type the same word. It decides how the cards are dealt each game.",
    "askPlaceholder": "e.g. pizza",
    "askStart": "Start",
    "askLabel": "Game word",
    "liveEnd": "Out of cards. Reshuffle?",
    "liveOver": "Game over",
    "liveShuffled": "The pile is shuffled"
  },
  cats: {
    "persona": "Describe yourself",
    "trait": "Trait",
    "deed": "Something you did",
    "moment": "Moment",
    "place": "Place",
    "relief": "It worked out"
  },
  chips: {
    "all": "All",
    "persona": "Describe yourself",
    "trait": "Traits",
    "deed": "Things you did",
    "moment": "Moments",
    "place": "Places",
    "relief": "Worked out"
  },
  cards: {
    hero: { n: "Hero", q: "Describe yourself as a hero. When did you save the day?" },
    leader: { n: "Leader", q: "Describe yourself as a leader. When did you step up and take charge?" },
    wizard: { n: "Wizard", q: "Describe yourself as a wizard. What can you do that others find almost magical?" },
    fairy: { n: "Fairy", q: "Describe yourself as a fairy. When did you quietly help someone?" },
    dragon: { n: "Dragon", q: "Describe yourself as a dragon. When did you stand your ground?" },
    wolf: { n: "Wolf", q: "Describe yourself as a wolf in the pack. What are you like in a group?" },
    gnome: { n: "Gnome", q: "Describe yourself as a gnome. What do you do for others without telling anyone?" },
    witch: { n: "Witch", q: "Describe yourself as a witch. What is your secret talent?" },
    troll: { n: "Troll", q: "Describe yourself as a troll. What makes you grumpy?" },
    brave: { n: "Brave", q: "Tell us about a time you were brave." },
    cunning: { n: "Cunning", q: "Tell us about a time you were cunning." },
    afraid: { n: "Afraid", q: "Tell us about a time you were scared but did it anyway." },
    angry: { n: "Angry", q: "Tell us about a time you were angry but stayed calm." },
    rest: { n: "Rest", q: "Tell us about a day when you did absolutely nothing and loved it." },
    absorbed: { n: "Absorbed", q: "Tell us about a time you got completely absorbed in something." },
    mine: { n: "Mine", q: "Tell us about something you do not want to share." },
    solution: { n: "Smart solution", q: "Tell us about a smart solution you came up with when something was stuck." },
    insight: { n: "Insight", q: "Tell us about something you have learned about yourself." },
    treasure: { n: "Treasure", q: "Tell us about something valuable you have kept, and why." },
    idea: { n: "Idea", q: "Tell us about an idea you had that turned out well." },
    decision: { n: "Bold decision", q: "Tell us about a decision that took courage." },
    mistake: { n: "Mistake", q: "Tell us about a mistake you learned from." },
    craft: { n: "My magic", q: "Tell us about something you can make or cook that turns out really well." },
    promise: { n: "Promise", q: "Tell us about a promise you kept." },
    storm: { n: "Storm", q: "Tell us about a time everything went wrong but it worked out." },
    lost: { n: "Lost", q: "Tell us about a time you got lost, for real or in life." },
    party: { n: "Party", q: "Tell us about a really fun party you were at." },
    turning: { n: "Turning point", q: "Tell us about a moment that changed you." },
    standup: { n: "Stand up", q: "Tell us about a time you stood up for something." },
    surprise: { n: "Surprise", q: "Tell us about a time you were truly surprised." },
    castle: { n: "My castle", q: "Tell us about a place where you feel like a king or queen." },
    darkwood: { n: "Scary woods", q: "Tell us about a place that felt scary but that you got through." },
    refuge: { n: "My refuge", q: "Tell us about the place you go when you want to be alone." },
    summit: { n: "The top", q: "Tell us about the highest or most beautiful place you have been." },
    tower: { n: "New perspective", q: "Tell us about a place that gave you a new perspective on something." },
    lake: { n: "Calm place", q: "Tell us about a place where you find calm." },
    cabin: { n: "Dream cabin", q: "Tell us about your dream cabin. Who do you invite?" },
    bridge: { n: "Always back", q: "Tell us about a place you always return to." },
    celebration: { n: "Celebration", q: "Tell us about the best celebration you have been to." },
    curse: { n: "Break the pattern", q: "Tell us about a habit or pattern you managed to break." },
    peace: { n: "Peace", q: "Tell us about a moment when everything felt calm and good." },
    home: { n: "Home again", q: "Tell us about when it felt best to come home." },
    share: { n: "Share", q: "Tell us about a time you shared something and it got better." }
  },
  help: {
    html: `<h2 id="helph" tabindex="-1">How to play</h2>
    <p>Icebreakers is a conversation game for groups where people do not know each other well, or where someone is shy. Each card has a picture and a question. You share something that fits the picture. It can be small and everyday.</p>
    <h3>How it works</h3>
    <ol>
      <li>Someone draws a card and reads the question aloud.</li>
      <li>Answer in a sentence or two, or tell a longer story if you like. The first thing that comes to mind is usually the best.</li>
      <li>The others listen and may ask one follow-up question, such as "What happened next?".</li>
      <li>Then it is the next person's turn.</li>
    </ol>
    <p><b>Passing is fine.</b> If a question does not suit you, draw a new card. Set <b>Cards per draw</b> to 2 to pick the one that feels easiest.</p>
    <h3>Card types</h3>
    <ul>
      <li><b>Describe yourself</b>: you describe yourself as the figure on the card. The most personal type, best once the group knows each other a little.</li>
      <li><b>Trait</b>: a time you were brave, cunning, scared or angry.</li>
      <li><b>Something you did</b>: a solution, an idea or a decision.</li>
      <li><b>Moment</b>: something that happened to you.</li>
      <li><b>Place</b>: somewhere that means something to you. The easiest place to start.</li>
      <li><b>It worked out</b>: something that ended well.</li>
    </ul>
    <p>The buttons under the draw button choose which types are drawn. Start with <b>Place</b> and <b>Moment</b> and save <b>Describe yourself</b> for later.</p>
    <h3>Several phones</h3>
    <ol>
      <li>Choose the number of <b>Players</b>. With more than one, the app asks for a shared word.</li>
      <li>Everyone types the <b>same word</b>. Capital letters do not matter. The word decides how the cards are split between you.</li>
      <li>Each player picks their own <b>position</b>, from 1 to the number of players. Two players with the same position get the same cards.</li>
    </ol>
    <p>Everyone can use a different language on their phone. The cards are dealt the same way in every language.</p>
    <p>Shortcut: send a ready-made link to each player. Add this at the end of the link, for example <code>#code-pizza-players-3-pos-2</code>. Add <code>-two</code> for two cards per draw and <code>-lang-sv</code> if the link should open in Swedish.</p>
    <p>Cards are drawn without repeats. When your pile runs out, the app asks if you want to shuffle. Each shuffle starts a new <b>round</b> with a new split, so everyone should shuffle at the same time. <b>Fullscreen</b> hides the settings so only the card shows.</p>`
  }
});
