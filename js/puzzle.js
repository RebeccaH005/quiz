// Letter sets with corresponding words that can be created from the letters
const letterSets = [
    {
      "letters": "AELPST",
      "words": ["ale", "ales", "ape", "apes", "apt", "east", "eat", "eats", "lap", "laps", "last", "late", "lea", "leap", "leas", "let", "lets", "pale", "pales", "pal", "pals", "pas", "past", "pat", "pats", "pea", "peal", "peals", "peas", "pelt", "pelts", "pest", "pet", "pets", "plat", "plate", "plates", "plats", "plea", "pleas", "sale", "salt", "sat", "sea", "seal", "sepal", "slap", "slat", "slate", "slates", "spat", "spate", "spelt", "staple", "tale", "tales", "tap", "tape", "tapes", "taps", "tea", "teal", "teals", "teas", "least", "step", "set", "sap", "spa", "apse", "alp", "alps", "asp", "astep", "tael", "taels", "sep", "sel", "sae", "eps", "steal", "steap"]
    },
    {
      "letters": "CEILNO",
      "words": ["ceil", "cine", "clean", "cleon", "coin", "coil", "cole", "cone", "icon", "lice", "lien", "line", "lino", "lion", "nice", "nile", "noil", "oil", "once", "loci", "loin", "lone", "noel", "leno", "clon", "colin", "ceil", "lien", "lice", "coil", "nice", "cleo", "cion", "cine", "lino", "linoe", "lien", "len", "lin", "lei", "ile", "inc", "neo", "ice", "ole", "one", "eon"]
    },
    {
      "letters": "DEINRT",
      "words": ["dent", "diet", "dine", "dire", "dirt", "din", "end", "nerd", "nest", "net", "ride", "rein", "rent", "rite", "tied", "tier", "tin", "tine", "tire", "trend", "tried", "trine", "diner", "trident", "inter", "tide", "tend", "tern", "tinder", "tined", "trend", "tried", "dint", "nite", "tern", "rind", "tine", "tire", "rite", "den", "die", "dier", "dir", "dit", "dit", "ident", "ind", "ired", "nerd", "niet", "nit", "rei", "ret", "rid", "tie", "tir", "tri"]
    },
    {
      "letters": "GHINOS",
      "words": ["gin", "gins", "gosh", "hog", "hogs", "hong", "nigh", "nogs", "ohs", "shin", "sing", "sigh", "sin", "sigh", "sign", "sing", "sling", "snog", "song", "son", "hos", "hog", "hogs", "honing", "nosh", "ion", "ins", "his", "nos", "inns", "soi", "ghi", "gis", "gon", "hin", "hins", "hio", "hons", "hos", "ing", "ingo", "ins", "ion", "ions", "nogs", "noh", "nohs", "ogi", "ogis", "ogs", "ons", "sig", "sigh", "sings", "soh"]
    },
    {
      "letters": "ADEIMT",
      "words": ["aide", "aim", "amid", "date", "dime", "diet", "edit", "emit", "item", "maid", "mate", "meat", "media", "maid", "mail", "mate", "mead", "media", "mediate", "meta", "mite", "tame", "tamed", "team", "tide", "time", "timed", "mid", "aid", "dim", "mat", "mad", "dime", "dame", "adit", "adits", "admit", "amide", "amie", "amies", "amin", "ami", "ate", "ate", "die", "emit", "eta", "ide", "ide", "imid", "iota", "mat", "met", "mit", "tam", "tame", "tead", "teda", "ted", "tide", "timid"]
    },
    {
      "letters": "BEGNOR",
      "words": ["beg", "ben", "bone", "boner", "bore", "born", "bong", "bren", "erg", "erg", "gen", "gene", "gone", "gnome", "gore", "gob", "neb", "neg", "nob", "nog", "orb", "ore", "org", "rob", "robe", "rog", "roger", "one", "bog", "eon", "ego", "erg", "reb", "reg", "roe", "berg", "borne", "ergo", "goner", "gorn", "greb", "grebo", "grob", "grobe", "neb", "nebo", "obe", "ogre", "orge", "robe", "rong"]
    },
    {
      "letters": "ACKORS",
      "words": ["ack", "arc", "ark", "ask", "car", "cask", "cork", "cors", "crack", "cask", "oar", "oak", "oaks", "orca", "orcas", "rack", "racks", "rock", "rocks", "sack", "scar", "scak", "soak", "sock", "socks", "scar", "sack", "ors", "ora", "ska", "oar", "ark", "oas", "orc", "arco", "arcos", "arks", "cark", "carks", "carso", "cos", "koa", "koas", "kora", "koras", "oaks", "oar", "oars", "oca", "ocas", "ora", "orks", "roc", "rocs", "rosa", "sac", "sack", "sacks", "soca", "sock"]
    },
    {
      "letters": "EFILMR",
      "words": ["elf", "elm", "file", "film", "fire", "firm", "flier", "filer", "fir", "fire", "firm", "fle", "flem", "frill", "frim", "lief", "life", "lime", "limer", "lire", "mile", "mire", "reef", "rife", "rifle", "ref", "rife", "rifle", "rem", "riel", "elf", "rim", "rime", "mire", "fir", "ler", "emir", "erf", "fermi", "ferl", "fier", "filer", "firl", "firle", "flier", "fre", "frem", "frim", "lei", "lier", "lire", "mer", "merl", "mir", "mire", "rei", "reif", "riel", "rif", "rife"]
    },
    {
      "letters": "DEPRSU",
      "words": ["deps", "deeps", "dues", "duper", "dupes", "dupe", "eups", "peds", "perd", "perdu", "perds", "pred", "preds", "pres", "prese", "prest", "pure", "puree", "pures", "purse", "pus", "reds", "reed", "reeds", "reps", "rued", "rues", "ruse", "rused", "sped", "spud", "spue", "spued", "spur", "spurred", "super", "supe", "suped", "sure", "used", "user", "ups", "eds", "sup", "per", "pes", "pus", "rue", "red", "sud", "ups", "drupe", "drupes", "erupts", "esp", "pes", "prude", "prudes", "pseud", "pseudo", "purs", "purse", "pus", "rep", "resup", "rud", "rued", "rudes", "ruds", "rups", "rush", "sep", "ser", "serde", "sered", "serup", "sprue", "spur", "spured", "spurs", "surd", "surds", "ures", "use"]
    },
    {
      "letters": "AGILNT",
      "words": ["ail", "alit", "alt", "anti", "gait", "gal", "gait", "gain", "gait", "gal", "gala", "galt", "gan", "gilt", "gin", "glia", "glint", "gnat", "lag", "lain", "lang", "lat", "lati", "ling", "lint", "lit", "nail", "natal", "nil", "tail", "tang", "til", "tin", "ting", "tan", "tag", "ant", "nat", "gnat", "lat", "gin", "align", "agin", "agit", "aglt", "algin", "alit", "angli", "anlit", "gait", "gal", "gali", "galt", "gilt", "glai", "glait", "glan", "glant", "glint", "glit", "lain", "lang", "langi", "liag", "liang", "ling", "lint", "lita", "nag", "nagi", "nagli", "tail", "taing", "tali", "taling", "tali", "tang", "tlan", "tlang"]
    }
  ];

// Initialising game state variables
let currentSetIndex;
let gameLetters = [];
let currentLetters = [];
let score = 0;
let timer = 120;
let timerInterval;
let foundWords = [];
let possibleWords = [];
let originalLetters = []; // Store the original set of letters
let letterPositions = []; // Store the positions of letters in the UI
let gameActive = false; // Track if the game is active

// Assigning variable names to DOM elements
const letterContainer = document.getElementById('letter-container');
const wordContainer = document.getElementById('word-container');
const submitButton = document.getElementById('submit');
const shuffleButton = document.getElementById('shuffle');
const clearButton = document.getElementById('clear');
const newGameButton = document.getElementById('new-game');
const startGameButton = document.getElementById('start-game');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const threeLetterWordsList = document.getElementById('three-letter-words');
const fourLetterWordsList = document.getElementById('four-letter-words');
const fiveLetterWordsList = document.getElementById('five-letter-words');
const sixLetterWordsList = document.getElementById('six-letter-words');
const gameOverModal = document.getElementById('game-over-modal');
const startGameModal = document.getElementById('start-game-modal');
const finalScoreElement = document.getElementById('final-score');
const wordsFoundElement = document.getElementById('words-found');
const totalWordsElement = document.getElementById('total-words');
const playAgainButton = document.getElementById('play-again');
const messageElement = document.getElementById('message');
const gameControlsContainer = document.getElementById('game-controls');

// Select letter set at random
function selectRandomLetterSet() {
    currentSetIndex = Math.floor(Math.random() * letterSets.length);
    return letterSets[currentSetIndex].letters.split('');
}
  
// Shuffle letters using the Fisher-Yates algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Rendering letters in the UI
function updateLetters() {
    // Clear the letter container
    letterContainer.innerHTML = '';
    
    // Reset letter positions
    letterPositions = [];
    
    // Add current letters
    gameLetters.forEach((letter, index) => {
      const letterElement = document.createElement('span');
      letterElement.textContent = letter;
      letterElement.style.margin = '0 5px';
      letterElement.style.padding = '5px 10px';
      letterElement.style.border = '1px solid black';
      letterElement.style.cursor = 'pointer';
      letterElement.setAttribute('data-index', index);
      
      letterElement.addEventListener('click', handleLetterClick);
      
      letterContainer.appendChild(letterElement);
      
      // Track the position of each letter
      letterPositions.push({
        letter: letter,
        element: letterElement
      });
    });
}
  
function updateWordContainer() {
    // Clear the word container
    wordContainer.innerHTML = '';
    
    // Add current word letters
    currentLetters.forEach((letter, index) => {
      const letterElement = document.createElement('span');
      letterElement.textContent = letter.letter;
      letterElement.style.margin = '0 5px';
      letterElement.style.padding = '5px 10px';
      letterElement.style.border = '1px solid black';
      letterElement.style.cursor = 'pointer';
      
      letterElement.addEventListener('click', () => {
        // Return the letter to the original container
        returnLetterToOriginalContainer(index);
      });
      
      wordContainer.appendChild(letterElement);
    });
}
  
function returnLetterToOriginalContainer(index) {
    const letterObj = currentLetters[index];
    
    // Add the letter back to the game letters
    gameLetters.push(letterObj.letter);
    
    // Remove from current letters
    currentLetters.splice(index, 1);
    
    // Update UI
    updateLetters();
    updateWordContainer();
}
  
function getCurrentWord() {
    return currentLetters.map(letterObj => letterObj.letter).join('');
}
  
function isValidWord(word) {
    return letterSets[currentSetIndex].words.includes(word.toLowerCase());
}
  
function updateScore(word) {
    // Award points based on word length
    const wordLength = word.length;
    let points = 0;
    
    switch (wordLength) {
      case 3:
        points = 100;
        break;
      case 4:
        points = 200;
        break;
      case 5:
        points = 400;
        break;
      case 6:
        points = 800;
        break;
    }
    
    score += points;
    scoreElement.textContent = score;
}
  
function addWordToResults(word) {
    const wordLength = word.length;
    const listItem = document.createElement('li');
    listItem.textContent = word;
    listItem.style.color = 'green';
    
    switch (wordLength) {
      case 3:
        threeLetterWordsList.appendChild(listItem);
        break;
      case 4:
        fourLetterWordsList.appendChild(listItem);
        break;
      case 5:
        fiveLetterWordsList.appendChild(listItem);
        break;
      case 6:
        sixLetterWordsList.appendChild(listItem);
        break;
    }
}
  
function showMessage(text, type) {
    // Set message text
    messageElement.textContent = text;
    
    // Set appropriate class
    messageElement.className = 'message';
    messageElement.classList.add(type);
    
    // Show message
    messageElement.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 3000);
}
  
function startTimer() {
    timerInterval = setInterval(() => {
      timer--;
      timerElement.textContent = timer;
      
      if (timer <= 0) {
        endGame();
      }
    }, 1000);
}
  
function endGame() {
    clearInterval(timerInterval);
    gameActive = false;
    finalScoreElement.textContent = score;
    wordsFoundElement.textContent = foundWords.length;
    totalWordsElement.textContent = letterSets[currentSetIndex].words.length;
    gameOverModal.style.display = 'block';
    
    // Disable game controls
    toggleGameControls(false);
}
  
function resetGame() {
    // Reset game state
    originalLetters = selectRandomLetterSet();
    gameLetters = [...originalLetters];
    currentLetters = [];
    foundWords = [];
    score = 0;
    timer = 120;
    gameActive = true;
    
    // Update UI
    scoreElement.textContent = score;
    timerElement.textContent = timer;
    threeLetterWordsList.innerHTML = '';
    fourLetterWordsList.innerHTML = '';
    fiveLetterWordsList.innerHTML = '';
    sixLetterWordsList.innerHTML = '';
    gameOverModal.style.display = 'none';
    startGameModal.style.display = 'none';
    messageElement.style.display = 'none';
    
    // Update letters
    updateLetters();
    updateWordContainer();
    
    // Enable game controls
    toggleGameControls(true);
    
    // Start timer
    clearInterval(timerInterval);
    startTimer();
}
  
function prepareGame() {
    // Initialize UI without starting the game
    originalLetters = selectRandomLetterSet();
    gameLetters = [...originalLetters];
    currentLetters = [];
    
    // Display start game modal
    startGameModal.style.display = 'block';
    
    // Disable game controls until game starts
    toggleGameControls(false);
    
    // Update initial UI
    updateLetters();
    updateWordContainer();
    
    // Set initial values
    scoreElement.textContent = '0';
    timerElement.textContent = '120';
}
  
function toggleGameControls(enabled) {
    // Enable/disable game buttons based on game state
    submitButton.disabled = !enabled;
    shuffleButton.disabled = !enabled;
    clearButton.disabled = !enabled;
    newGameButton.disabled = !enabled;
    
    // Optionally change styling to indicate disabled state
    if (enabled) {
      gameControlsContainer.classList.remove('disabled');
    } else {
      gameControlsContainer.classList.add('disabled');
    }
}
  
// Event handlers
function handleLetterClick() {
    if (!gameActive) return; // Ignore clicks if game is not active
    
    const index = parseInt(this.getAttribute('data-index'));
    const letter = gameLetters[index];
    
    // Add letter to current word
    currentLetters.push({
      letter: letter,
      originalIndex: index
    });
    
    // Remove letter from game letters
    gameLetters.splice(index, 1);
    
    // Update UI
    updateLetters();
    updateWordContainer();
}
  
// Button event listeners
submitButton.addEventListener('click', () => {
    if (!gameActive) return; // Ignore if game is not active
    
    const word = getCurrentWord();
    
    if (word.length < 3) {
      showMessage('Word must be at least 3 letters long!', 'warning');
      return;
    }
    
    if (foundWords.includes(word.toLowerCase())) {
      showMessage('You already found this word!', 'warning');
      return;
    }
    
    if (isValidWord(word)) {
      // Add word to found words
      foundWords.push(word.toLowerCase());
      
      // Update score
      updateScore(word);
      
      // Add word to results
      addWordToResults(word);
      
      // Show success message
      showMessage(`Great! "${word}" found (+${word.length >= 6 ? 800 : word.length >= 5 ? 400 : word.length >= 4 ? 200 : 100} points)`, 'success');
      
      // Return letters to the letter container
      currentLetters.forEach(letterObj => {
        gameLetters.push(letterObj.letter);
      });
      
      // Clear current word
      currentLetters = [];
      
      // Update UI
      updateLetters();
      updateWordContainer();
    } else {
      showMessage(`"${word}" is not a valid word!`, 'error');
      
      // Return letters to the letter container
      currentLetters.forEach(letterObj => {
        gameLetters.push(letterObj.letter);
      });
      
      // Clear current word
      currentLetters = [];
      
      // Update UI
      updateLetters();
      updateWordContainer();
    }
});
  
shuffleButton.addEventListener('click', () => {
    if (!gameActive) return; // Ignore if game is not active
    
    gameLetters = shuffleArray(gameLetters);
    updateLetters();
    showMessage('Letters shuffled!', 'success');
});
  
clearButton.addEventListener('click', () => {
    if (!gameActive) return; // Ignore if game is not active
    
    // Return all letters to the original container
    currentLetters.forEach(letterObj => {
      gameLetters.push(letterObj.letter);
    });
    
    currentLetters = [];
    
    // Update UI
    updateLetters();
    updateWordContainer();
    showMessage('Word cleared!', 'warning');
});
  
newGameButton.addEventListener('click', () => {
    // Show start game modal instead of immediately starting a new game
    startGameModal.style.display = 'block';
});
  
startGameButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', () => {
    // Show start game modal instead of immediately starting a new game
    startGameModal.style.display = 'block';
    gameOverModal.style.display = 'none';
});
  
// Initialize page with game ready to start
window.addEventListener('load', prepareGame);