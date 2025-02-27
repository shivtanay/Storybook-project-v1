/* Interactive Storybook Adventure Game - 8th Grade Edition */
/* Core logic for managing game state, UI, and player interactions */

/* Global variables for tracking game progress */
let playerAdventureScore = 0; // Accumulates points based on player actions
let opponentBaseScore = 100; // Static score for comparison at game end
const adventureRecap = []; // Array storing player action summaries
const choiceHistory = []; // Array logging all player choices

/* DOM elements for interacting with the UI */
const storyTextElement = document.getElementById("story-text");
const choicesContainerElement = document.getElementById("choices-container");
const inputContainerElement = document.getElementById("input-container");
const playerInputElement = document.getElementById("player-input");
const submitButton = document.getElementById("submit-btn");
const welcomeSectionElement = document.getElementById("welcome-section");
const storySectionElement = document.getElementById("story-section");
const startButton = document.getElementById("start-btn");
const playerNameInputElement = document.getElementById("player-name");
const restartButton = document.getElementById("restart-btn");
const stopButton = document.getElementById("stop-btn");
const mainContainerElement = document.getElementById("main-container");
const typingProgressBar = document.getElementById("typing-progress");
const helpButton = document.getElementById("help-btn");
const helpContentElement = document.getElementById("help-content");

const backgroundMusicElement = document.getElementById("background-music");
const soundEffectElement = document.getElementById("sound-effect");
const backgroundContainerElement = document.getElementById(
  "background-container"
);

/* Game state variables for controlling flow */
let playerName = ""; // Stores the player's entered name
let currentSetting = ""; // Tracks the active world setting
let currentLocation = ""; // Tracks specific location within the setting
let storyEventQueue = []; // Queue of story events to be displayed
let animationTypingSpeed = 40; // Speed of text animation in milliseconds
let isTextAnimating = false; // Prevents overlapping text animations
let isMusicMuted = false; // Toggle for background music
let isSoundMuted = false; // Toggle for sound effects

/* Sets up audio controls dynamically */
const audioControlsContainer = document.createElement("div");
audioControlsContainer.className =
  "audio-controls position-fixed top-20 end-0 p-2";

// Music toggle button
const musicToggleButton = document.createElement("button");
musicToggleButton.className = "audio-btn btn btn-sm btn-outline-light me-2";
musicToggleButton.innerHTML = '<i class="fa fa-music"></i>';
musicToggleButton.title = "Toggle Music";
musicToggleButton.addEventListener("click", toggleMusic);

// Sound effects toggle button
const soundToggleButton = document.createElement("button");
soundToggleButton.className = "audio-btn btn btn-sm btn-outline-light";
soundToggleButton.innerHTML = '<i class="fa fa-volume-up"></i>';
soundToggleButton.title = "Toggle Sound Effects";
soundToggleButton.addEventListener("click", toggleSound);

audioControlsContainer.appendChild(musicToggleButton);
audioControlsContainer.appendChild(soundToggleButton);
document.body.appendChild(audioControlsContainer);

/* Visual sound wave indicator for audio activity */
const soundWaveIndicator = document.createElement("div");
soundWaveIndicator.className =
  "sound-wave paused position-fixed bottom-0 end-0 p-2";
for (let i = 0; i < 5; i++) {
  const bar = document.createElement("div");
  bar.className = "bar d-inline-block bg-light";
  bar.style.width = "5px";
  bar.style.height = "20px";
  bar.style.margin = "0 2px";
  soundWaveIndicator.appendChild(bar);
}
document.body.appendChild(soundWaveIndicator);

/* Toggles background music on or off */
function toggleMusic() {
  isMusicMuted = !isMusicMuted;
  if (isMusicMuted) {
    backgroundMusicElement.pause();
    musicToggleButton.classList.add("muted");
    musicToggleButton.innerHTML = '<i class="fa fa-volume-mute"></i>';
    soundWaveIndicator.classList.add("paused");
    soundWaveIndicator.classList.remove("playing");
  } else {
    backgroundMusicElement.play();
    musicToggleButton.classList.remove("muted");
    musicToggleButton.innerHTML = '<i class="fa fa-music"></i>';
    soundWaveIndicator.classList.remove("paused");
    soundWaveIndicator.classList.add("playing");
  }
}

/* Toggles sound effects on or off */
function toggleSound() {
  isSoundMuted = !isSoundMuted;
  soundToggleButton.classList.toggle("muted");
  soundToggleButton.innerHTML = isSoundMuted
    ? '<i class="fa fa-volume-mute"></i>'
    : '<i class="fa fa-volume-up"></i>';
}

/* Plays a specified sound effect if not muted */
function playSound(soundName) {
  if (!isSoundMuted && soundName) {
    soundEffectElement.src = soundMap[soundName] || "";
    soundEffectElement
      .play()
      .catch((e) => console.log("Sound playback error:", e));
  }
}

/* Plays thematic background music if not muted */
function playMusic(theme) {
  if (!isMusicMuted && theme) {
    backgroundMusicElement.src = musicMap[theme] || "";
    backgroundMusicElement
      .play()
      .catch((e) => console.log("Music playback error:", e));
    soundWaveIndicator.classList.remove("paused");
    soundWaveIndicator.classList.add("playing");
  }
}

/* Updates the background image based on setting and location */
function setBackgroundImage(setting, location) {
  const imageUrl =
    backgroundMap[setting]?.[location?.toLowerCase()] ||
    backgroundMap[setting]?.default ||
    "";
  if (imageUrl)
    backgroundContainerElement.style.backgroundImage = `url(${imageUrl})`;
}

/* Adds a new story event to the queue for sequential display */
function addToStoryQueue(eventText, eventChoices = null, eventCallback = null) {
  storyEventQueue.push({
    text: eventText,
    choices: eventChoices,
    callback: eventCallback,
  });
}

/* Clears all pending story events from the queue */
function clearStoryQueue() {
  storyEventQueue = [];
}

/* Processes the next event in the story queue */
function processStoryQueue() {
  if (storyEventQueue.length === 0 || isTextAnimating) return;
  const currentEvent = storyEventQueue.shift();
  typeWriterEffect(currentEvent.text, () => {
    if (currentEvent.choices) {
      displayChoices(currentEvent.choices, currentEvent.callback);
    } else {
      setTimeout(processStoryQueue, 1000); // Adds a pause for pacing
    }
  });
}

/* Animates text display with a typewriter effect */
function typeWriterEffect(displayText, onComplete) {
  if (!storyTextElement) return;
  isTextAnimating = true;
  const maxParagraphLimit = 6; // Limits visible paragraphs to maintain readability
  const existingParagraphs = storyTextElement.querySelectorAll("p");
  if (existingParagraphs.length >= maxParagraphLimit) {
    for (
      let i = 0;
      i < existingParagraphs.length - maxParagraphLimit + 1;
      i++
    ) {
      existingParagraphs[i]?.remove();
    }
  }
  storyTextElement.insertAdjacentHTML("beforeend", "<p></p>");
  const currentParagraph = storyTextElement.lastElementChild;
  let charIndex = 0;
  const typingInterval = setInterval(() => {
    if (charIndex < displayText.length) {
      currentParagraph.textContent += displayText[charIndex];
      charIndex++;
      typingProgressBar.style.width = `${
        (charIndex / displayText.length) * 100
      }%`;
      storyTextElement.scrollTop = storyTextElement.scrollHeight;
    } else {
      clearInterval(typingInterval);
      isTextAnimating = false;
      typingProgressBar.style.width = "0%";
      onComplete?.();
    }
  }, animationTypingSpeed);
}

/* Generates and displays choice buttons for player decisions */
function displayChoices(choiceOptions, choiceCallback) {
  if (!choicesContainerElement) return;
  choicesContainerElement.innerHTML = "";
  choiceOptions.forEach((option) => {
    const choiceButton = document.createElement("button");
    choiceButton.className = "btn btn-primary choice-btn w-100";
    choiceButton.textContent = option;
    choiceButton.addEventListener("click", () => {
      playSound("click");
      choiceHistory.push(option); // Logs player's choice
      choicesContainerElement.innerHTML = "";
      choiceCallback?.(option.toLowerCase());
      processStoryQueue();
    });
    choicesContainerElement.appendChild(choiceButton);
  });
}

/* Validates and processes player text input */
function processPlayerInput() {
  const inputText = playerInputElement?.value.trim().toLowerCase() || "";
  if (!inputText) {
    addToStoryQueue("Please enter a choice—don’t leave it blank!");
    return;
  }
  playerInputElement.value = "";
  if (inputText === "stop") {
    stopStory();
    return;
  }
  if (inputText === "hint") {
    addToStoryQueue(
      "Hint: Try different paths to find your way home and boost your score!"
    );
    return;
  }
  const inputCallback = window[inputContainerElement?.dataset.callback];
  if (!inputCallback) {
    addToStoryQueue(
      "That’s not a valid command—use the story options or type 'stop' or 'hint'."
    );
    return;
  }
  // Example validation based on common choices
  const validInputs = [
    "yes",
    "no",
    "inn",
    "guild",
    "palace",
    "lake",
    "forest",
    "dragon",
    "cafe",
    "train station",
    "bunker",
  ];
  if (!validInputs.includes(inputText)) {
    addToStoryQueue(
      `"${inputText}" isn’t valid here—try something like "${validInputs[0]}" or "${validInputs[1]}".`
    );
    return;
  }
  choiceHistory.push(inputText);
  inputCallback(inputText);
}

/* Displays the input field for player commands */
function showInputField(inputCallback) {
  inputContainerElement?.classList.remove("hidden");
  playerInputElement?.focus();
  inputContainerElement.dataset.callback = inputCallback.name;
}

/* Hides the input field when not needed */
function hideInputField() {
  inputContainerElement?.classList.add("hidden");
  delete inputContainerElement.dataset.callback;
}

/* Terminates the current story session with a pause message */
function stopStory() {
  clearStoryQueue();
  choicesContainerElement.innerHTML = "";
  hideInputField();
  backgroundMusicElement.pause();
  soundWaveIndicator.classList.add("paused");
  soundWaveIndicator.classList.remove("playing");
  if (storyTextElement) {
    storyTextElement.innerHTML =
      "<p>Story paused! Click RESTART to begin a new adventure or explore another path!</p>";
    const pauseImage = document.createElement("img");
    pauseImage.src =
      "https://media.tenor.com/sWkHnUiRJvIAAAAC/reading-read.gif";
    pauseImage.alt = "Paused";
    pauseImage.className = "stop-gif w-100";
    storyTextElement.appendChild(pauseImage);
  }
}

/* Resets game state and restarts the adventure */
function restartAdventure() {
  playerAdventureScore = 0;
  adventureRecap.length = 0;
  choiceHistory.length = 0;
  storyTextElement.innerHTML = "";
  choicesContainerElement.innerHTML = "";
  hideInputField();
  startAdventure();
}

/* Updates the header text with the current setting */
function updateHeader(settingName) {
  const headerElement = mainContainerElement?.querySelector("h1");
  if (headerElement) {
    headerElement.innerHTML = `<i class="fas fa-book"></i> ${settingName.toUpperCase()} <i class="fas fa-star"></i>`;
  }
}

/* Applies theme-specific styling and audio based on the setting */
function setTheme(setting) {
  if (!mainContainerElement) return;
  mainContainerElement.className = "container mt-5"; // Resets to base class
  if (setting === "medieval village") {
    mainContainerElement.classList.add("medieval-theme");
    playMusic("medieval");
    setBackgroundImage(setting);
  } else if (setting === "Sky Islands") {
    mainContainerElement.classList.add("sky-theme");
    playMusic("sky");
    setBackgroundImage(setting);
  } else if (setting === "Futuristic City") {
    mainContainerElement.classList.add("futuristic-theme");
    playMusic("futuristic");
    setBackgroundImage(setting);
  }
}

/* Launches the game and begins the player's adventure */
function startAdventure() {
  playerName = playerNameInputElement?.value.trim() || "Explorer";
  currentSetting = selectRandomSetting();
  welcomeSectionElement?.classList.add("hidden");
  storySectionElement?.classList.remove("hidden");
  restartButton?.classList.remove("hidden");
  stopButton?.classList.remove("hidden");
  setTheme(currentSetting);
  updateHeader(currentSetting);
  clearStoryQueue();
  addToStoryQueue(
    `Greetings, ${playerName}! Welcome to your interactive adventure!`
  );
  addToStoryQueue(
    `Explore enchanting worlds—your choices craft a unique tale. Click buttons to decide your path or type "stop" to end anytime. Your mission: navigate back home while racking up points!`
  );
  addToStoryQueue(`Ready, ${playerName}? Let’s dive in!`);
  addToStoryQueue(
    `You’re wandering through a dark forest when a mysterious glow flickers ahead...`
  );
  addToStoryQueue(
    `Drawn in, you step closer—WHOOSH!—and you’re pulled into the light!`
  );

  if (currentSetting === "medieval village") {
    addToStoryQueue(
      `You land in a medieval village teeming with magic and wonder!`
    );
    addToStoryQueue(
      `Will you explore this mystical realm?`,
      ["YES", "NO"],
      startMedievalVillage
    );
  } else if (currentSetting === "Sky Islands") {
    addToStoryQueue(
      `You find yourself on a vast island soaring among the clouds!`
    );
    addToStoryQueue(
      `Ready to explore this aerial marvel?`,
      ["YES", "NO"],
      startSkyIslands
    );
  } else if (currentSetting === "Futuristic City") {
    addToStoryQueue(
      `You arrive in a futuristic city alive with robots and neon brilliance!`
    );
    addToStoryQueue(
      `Eager to dive into this high-tech wonder?`,
      ["YES", "NO"],
      startFuturisticCity
    );
  }
  processStoryQueue();
}

/* Randomly selects a setting from available options */
function selectRandomSetting() {
  const availableSettings = Object.keys(storyData);
  return availableSettings[
    Math.floor(Math.random() * availableSettings.length)
  ];
}

/* Toggles the visibility of the help menu */
function toggleHelpMenu() {
  helpContentElement.classList.toggle("hidden");
}

/* Sets up event listeners for user interactions */
startButton?.addEventListener("click", startAdventure);
submitButton?.addEventListener("click", processPlayerInput);
restartButton?.addEventListener("click", restartAdventure);
stopButton?.addEventListener("click", stopStory);
playerInputElement?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") processPlayerInput();
});
helpButton?.addEventListener("click", toggleHelpMenu);
document.addEventListener("DOMContentLoaded", () =>
  playerNameInputElement?.focus()
);
