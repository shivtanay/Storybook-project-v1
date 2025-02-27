// Static Data for the Interactive Storybook Adventure Game
// Provides predefined settings, sounds, music, and backgrounds for consistency

/* Defines available settings and their locations */
const storyData = {
  "medieval village": ["Inn", "Guild", "Kings Palace"], // Locations in the medieval village
  "Sky Islands": ["Lake", "Forest", "Dragon"], // Locations in the sky islands
  "Futuristic City": ["Cafe", "Train station", "Underground Bunker"], // Locations in the futuristic city
};

/* Maps sound effects to their URLs for audio playback */
const soundMap = {
  click: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Button click sound
  zap: "sounds/zap.mp3", // Portal or energy sound (local file)
  win: "sounds/win.mp3", // Victory sound (local file)
  magic: "sounds/magic.mp3", // Magical effect (local file)
  splash: "sounds/splash.mp3", // Water splash (local file)
  roar: "sounds/roar.mp3", // Dragon roar (local file)
  beep: "sounds/beep.mp3", // Robotic beep (local file)
};

/* Maps background music to their URLs for thematic ambiance */
const musicMap = {
  medieval: "medieval.mp3", // Medieval theme music
  sky: "blue-sky-231778.mp3", // Sky islands theme music
  futuristic: "future.mp3", // Futuristic city theme music
};

/* Maps background images to settings and locations for visual immersion */
const backgroundMap = {
  "medieval village": {
    default:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f5232791894863.5e3d437767813.jpg", // Default medieval village background
    inn: "https://m.media-amazon.com/images/I/71WUGWCe4BL.jpg", // Inn interior
    guild:
      "https://miro.medium.com/v2/resize:fit:1200/1*oKG5XpAqXDS54OjHdCWUfw.jpeg", // Guild hall
    palace:
      "https://www.travelandleisure.com/thmb/WREQ9nIkTsxWew7PYaSGwQa_ABA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chateau-de-foix-CASTL0716-7d6252ea28ff47339851bb8692b8d21f.jpg", // Palace exterior
  },
  "Sky Islands": {
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTaSL5OaEluoIbW2EnpCXuS7tAZ69EaTd3Gw&s", // Default sky islands background
    lake: "https://t4.ftcdn.net/jpg/05/55/17/31/360_F_555173152_i2fA3GSRQUP6ororkDp2K61aUEBeex5e.jpg", // Sky lake
    forest:
      "https://images.stockcake.com/public/b/9/b/b9b79c91-d5e6-45e8-8b17-b62b45975288_large/floating-islands-sky-stockcake.jpg", // Glowing forest
    dragon:
      "https://thumbs.dreamstime.com/b/dragon-resting-floating-island-above-clouds-serene-landscape-large-rests-waterfalls-cascade-sky-below-341731644.jpg", // Dragon peak
  },
  "Futuristic City": {
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/052/260/606/small_2x/the-future-city-where-buildings-tower-over-streets-filled-with-floating-cars-capturing-a-sci-fi-inspired-world-of-advanced-technology-urban-planning-and-visionary-transportation-solutions-free-video.jpg", // Default futuristic city background
    cafe: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGrqe9NpYFJpY-ChK9vPmT_Eh-nmxtTCwGA&s", // Robot cafe
    "train station": "https://en.pimg.jp/109/633/834/1/109633834.jpg", // Train station (corrected key to match storyData)
    bunker:
      "https://media.newyorker.com/photos/5f18bfc5f67f1a5e4b3ac954/master/w_1600%2Cc_limit/200803_r36807.jpg", // Underground bunker
  },
};
