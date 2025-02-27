// Story Content for the Interactive Storybook Adventure Game
// Defines detailed narratives and branching logic for each adventure world

/* Finalizes the game and presents a customizable, detailed report */
function endStory() {
  playSound("win"); // Plays victory sound effect
  addToStoryQueue(
    `Congratulations, ${playerName}! You’ve masterfully conquered your adventure!`
  );
  addToStoryQueue(
    `Your thrilling journey through ${currentSetting} was epic—ready for another? Hit RESTART to explore anew!`
  );
  addToStoryQueue(`
  ====================
    ADVENTURE REPORT
  ====================
  Your Score: ${playerAdventureScore}
  Opponent’s Score: ${opponentBaseScore}
  ${
    playerAdventureScore >= opponentBaseScore
      ? "You’ve triumphed spectacularly!"
      : "A near miss—try again to claim victory!"
  }
  
  Fantastic work, ${playerName}!
    `);
  addToStoryQueue("Key Moments from Your Quest:");
  adventureRecap.forEach((detail, index) =>
    addToStoryQueue(`${index + 1}. ${detail}`)
  );
  addToStoryQueue("Your Decisions Along the Way:");
  choiceHistory.forEach((choice, index) =>
    addToStoryQueue(`${index + 1}. ${choice}`)
  );
  addToStoryQueue(`Save this report by copying it—capture your heroic tale!`);
  processStoryQueue();
}

// Medieval Village Story
/* Begins the medieval village adventure with an initial choice */
function startMedievalVillage(choice) {
  if (choice === "no") {
    playerAdventureScore += 5;
    adventureRecap.push("Chose a peaceful pause in the village ( +5 points )");
    addToStoryQueue(
      `You ease onto a weathered bench in the village square, resting as the bustle surrounds you. The air carries the warm scent of fresh bread from a nearby baker, blending with the earthy whiff of hay. A tiny red bird perches close, its chirps urging, "Adventure’s just beyond—don’t wait too long!"`
    );
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Eagerly embraced the village’s magic ( +10 points )");
    addToStoryQueue(
      `Heart racing, you dive into the medieval village’s vibrant core. Cobblestone paths hum with life—vendors bellow about potions that shimmer like liquid starlight, a blacksmith’s hammer sings against glowing steel, and a mystical buzz hints at secrets ripe for discovery.`
    );
  }
  addToStoryQueue(
    `Strolling through the lively streets, three destinations snag your attention: a snug inn with smoke curling from its chimney, a shadowy guild hall where cloaked figures murmur, and a majestic palace with golden banners swaying in the breeze.`
  );
  addToStoryQueue(
    `Where will your journey take you?`,
    ["INN", "GUILD", "PALACE"],
    medievalLocationChoice
  );
}

/* Routes player to selected medieval village location */
function medievalLocationChoice(choice) {
  currentLocation = choice;
  setBackgroundImage("medieval village", choice);
  if (choice === "inn") {
    playerAdventureScore += 10;
    adventureRecap.push("Entered the cozy inn ( +10 points )");
    medievalInn();
  } else if (choice === "guild") {
    playerAdventureScore += 15;
    adventureRecap.push("Explored the mysterious guild ( +15 points )");
    medievalGuild();
  } else {
    playerAdventureScore += 20;
    adventureRecap.push("Ventured into the grand palace ( +20 points )");
    medievalPalace();
  }
}

/* Inn storyline with interactive choices */
function medievalInn() {
  addToStoryQueue(
    `You nudge open the inn’s hefty oak door, greeted by a rush of warmth that feels like home. Inside, the buzz of life fills the space—travelers swap tales over sturdy tables, mugs clinking in jovial rhythm. A fire roars in the corner, bathing the stone walls in golden flickers, while the rich smell of roasting meat wafts through the air.`
  );
  addToStoryQueue(
    `A robust cook, apron speckled with flour, stomps over with a wide, toothy grin. "Oi, kid!" he booms, voice cutting through the chatter. "You’ve got a hungry look—or maybe a curious one. Fancy some soup to thaw your bones, or a story to fire up your imagination?"`
  );
  addToStoryQueue(`What’s your choice?`, ["SOUP", "STORY"], innChoice1);
}

function innChoice1(choice) {
  if (choice === "soup") {
    playerAdventureScore += 10;
    adventureRecap.push("Savored the spicy soup ( +10 points )");
    addToStoryQueue(
      `The cook dips a ladle into a massive cauldron, serving up a steaming bowl with a flourish. It’s a vivid crimson, swirled with spices that gleam like tiny constellations. You take a bold sip—bam!—it’s a fiery kick that dances down your throat, and suddenly you burp, unleashing a blazing jet of fire! The inn erupts in cheers, travelers marveling at your blazing display.`
    );
    addToStoryQueue(
      `What now—flaunt your fiery talent, or uncover the soup’s secret?`,
      ["SHOW", "ASK"],
      innChoice2a
    );
  } else {
    playerAdventureScore += 15;
    adventureRecap.push("Listened to a captivating tale ( +15 points )");
    addToStoryQueue(
      `The cook drags a stool over, leaning in with a sly twinkle in his eye. "Settle in, kid—this one’s gold! Long ago, a wanderer like you found a magic key buried in the guild. They say it opens any lock—even doors to other worlds!" He winks, leaving you wondering if it’s fact or fireside fancy.`
    );
    addToStoryQueue(
      `Chase that key in the guild, or stay for more inn tales?`,
      ["GUILD", "CHILL"],
      innChoice2b
    );
  }
}

function innChoice2a(choice) {
  if (choice === "show") {
    playerAdventureScore += 10;
    adventureRecap.push("Showcased fiery burps ( +10 points )");
    addToStoryQueue(
      `You puff up and unleash another fiery burp—a roaring flame spirals across the room, nearly toasting a traveler’s scruffy beard! Laughter and applause thunder through the inn, and a grizzled man in a tattered hat yells, "Guild magic, that is! More of that awaits over there!" His words echo as the blaze dims, nudging you toward the guild.`
    );
    medievalGuild();
  } else {
    playerAdventureScore += 5;
    adventureRecap.push("Investigated the soup’s magic ( +5 points )");
    addToStoryQueue(
      `You lean across the table, eyeing the cook. "What’s in this soup making me a fire-breather?" He laughs, wiping his hands. "Guild trickery—dragon-scale spices! They’ve got troves of it in their hall if you’ve got the guts to look." He points to the guild’s dark outline across the square.`
    );
    addToStoryQueue(
      `Head to the guild, or stay put?`,
      ["GO", "STAY"],
      innChoice3a
    );
  }
}

function innChoice2b(choice) {
  if (choice === "guild") {
    medievalGuild();
  } else {
    addToStoryQueue(
      `You sink deeper into the inn’s cozy embrace, letting the fire’s warmth wash over you. The noise quiets as a scrappy kid with tangled hair and a patched cloak slides next to you. "Psst," he whispers, eyes flickering, "skip the guild—palace has the real loot! Gold, gems, a crown maybe!" His grin dares you to bite.`
    );
    addToStoryQueue(
      `Follow his palace tip, or dismiss him?`,
      ["CHECK", "IGNORE"],
      innChoice3b
    );
  }
}

function innChoice3a(choice) {
  if (choice === "go") {
    medievalGuild();
  } else {
    innChoice3b("ignore");
  }
}

function innChoice3b(choice) {
  if (choice === "check") {
    playerAdventureScore += 15;
    adventureRecap.push("Pursued the kid’s palace lead ( +15 points )");
    medievalPalace();
  } else {
    addToStoryQueue(
      `You brush off the kid with a wave, pegging him for a pest. The cook glances over, grumbling, "Stubborn one, eh? Fine, take this!" He flicks a dented coin your way—it catches the firelight with a faint shimmer. "It’s got magic—don’t waste it!"`
    );
    addToStoryQueue(
      `Keep the coin, or toss it back?`,
      ["KEEP", "TOSS"],
      innChoice4
    );
  }
}

function innChoice4(choice) {
  if (choice === "keep") {
    playerAdventureScore += 10;
    adventureRecap.push("Held onto the glowing coin ( +10 points )");
    addToStoryQueue(
      `You pocket the coin, feeling it hum softly against your skin. It sparks to life with a golden burst, projecting a radiant map into the air—lines weave straight to the guild hall! The inn’s crowd gasps as the light fades, handing you a glowing path forward.`
    );
    medievalGuild();
  } else {
    addToStoryQueue(
      `You flip the coin back at the cook, but it skitters wide, bouncing across the floor. A scruffy mutt snatches it up and bolts out the door, yapping wildly as if barking, "Palace time!" You’re swept into its mad dash, chasing through the village streets!`
    );
    medievalPalace();
  }
}

/* Guild storyline with magical encounters */
function medievalGuild() {
  playSound("magic");
  addToStoryQueue(
    `You step into the guild hall, and magic hits you like a storm. Dusty books soar through the air like frantic birds, pages rustling with ancient secrets. Shelves brim with glowing potions and humming crystals, casting eerie shadows. A wizard in a star-flecked robe spots you, his bushy beard twitching as he waves you over. "New blood, eh?" he cackles.`
  );
  addToStoryQueue(
    `He peers over crooked glasses, grinning wide. "What’s it to be, kid? A spell to light your way, or a quest to test your spine? Pick fast—I’m not one for dawdling!" His challenge hangs in the air.`
  );
  addToStoryQueue(`Your move?`, ["SPELL", "QUEST"], guildChoice1);
}

function guildChoice1(choice) {
  if (choice === "spell") {
    playerAdventureScore += 15;
    adventureRecap.push("Mastered a luminous spell ( +15 points )");
    addToStoryQueue(
      `The wizard claps sharply, and blue light whirls around you like a living wind. "This’ll make you a beacon!" he declares, chanting strange words that echo oddly. Your hands shimmer, then your whole body flares with golden light, brightening the hall and unveiling hidden runes on the walls.`
    );
    addToStoryQueue(
      `"Neat, huh?" he grins, stroking his beard. "Glow brighter to see more, or ask how it works?"`
    );
    addToStoryQueue(`What’s next?`, ["GLOW", "ASK"], guildChoice2a);
  } else {
    playerAdventureScore += 20;
    adventureRecap.push("Took on a daring guild quest ( +20 points )");
    addToStoryQueue(
      `"Quest it is!" the wizard bellows, yanking a dusty scroll from a shelf. "My favorite wand’s gone—last seen in the palace, snatched by a crafty thief! Silver-handled, sparks when waved. Get it back, and I’ll make it worth your while!" He shoves the crackling scroll into your hands.`
    );
    medievalPalace();
  }
}

function guildChoice2a(choice) {
  if (choice === "glow") {
    playerAdventureScore += 10;
    adventureRecap.push("Shone with enhanced glow ( +10 points )");
    addToStoryQueue(
      `You focus, pushing the glow to surge brighter. It pulses like a heartbeat, flooding the hall with warm light. Shadows vanish, and a trapdoor creaks open in the floor, revealing a dark, winding stairwell. "Well, look at you!" the wizard cheers, slapping your back. "A natural!"`
    );
    addToStoryQueue(
      `Descend the stairs, or hold off?`,
      ["ENTER", "WAIT"],
      guildChoice3a
    );
  } else {
    playerAdventureScore += 5;
    adventureRecap.push("Explored the spell’s magic ( +5 points )");
    addToStoryQueue(
      `"How’s this glow tick?" you ask, flexing your lit hands. The wizard’s eyes gleam. "Guild craft—tied to palace lanterns of old! It unveils the hidden—doors, relics, you name it. Palace might have more to show if you’re up for it!" He points to the towering castle beyond.`
    );
    medievalPalace();
  }
}

function guildChoice3a(choice) {
  if (choice === "enter") {
    playerAdventureScore += 15;
    adventureRecap.push("Ventured down the secret stairs ( +15 points )");
    addToStoryQueue(
      `You steady yourself and descend the rickety stairs, your glow slicing through the murk. The air grows cold, walls slick with moss as you spiral downward. At last, the tunnel dumps you into a dusty basement—crates and old armor loom around you, distant voices filtering from above. You’re in the palace’s depths!`
    );
    medievalPalace();
  } else {
    addToStoryQueue(
      `You hesitate, staring into the dark stairwell. The wizard shrugs, brushing off his robe. "Your loss, kid—the palace is where it’s at anyway! Royals always cook up something juicy." He shoos you out with a wave, stars on his cloak twinkling as you go.`
    );
    medievalPalace();
  }
}

/* Palace storyline with royal encounters */
function medievalPalace() {
  addToStoryQueue(
    `You approach the palace, its stone walls towering over the village like a silent giant. Golden flags whip in the wind atop sharp turrets, and armored guards clank past, spears flashing in the sun. Before you can knock, a lively princess bursts from the gates, her purple-gold dress swirling, crown askew from her sprint.`
  );
  addToStoryQueue(
    `"Hey, you!" she calls, skidding to a stop with a grin. "You look like fun! I’ve lost something dear, or we could race the courtyard—your choice! I’m starved for action here!" Her mischievous eyes dare you to pick.`
  );
  addToStoryQueue(`Help her, or race her?`, ["HELP", "RACE"], palaceChoice1);
}

function palaceChoice1(choice) {
  if (choice === "help") {
    playerAdventureScore += 20;
    adventureRecap.push("Found the princess’s crown ( +20 points )");
    addToStoryQueue(
      `"Hero mode!" the princess cheers, hauling you into the throne room. "My crown’s vanished—probably slipped under something during archery practice!" You scour the lavish hall, past velvet drapes and gleaming candlesticks, until a glint under a plush chair catches your eye—an emerald-studded crown tangled in dusty scrolls!`
    );
    addToStoryQueue(
      `You’ve nabbed it—keep it, or return it?`,
      ["KEEP", "GIVE"],
      palaceChoice2a
    );
  } else {
    playerAdventureScore += 15;
    adventureRecap.push("Raced the spirited princess ( +15 points )");
    addToStoryQueue(
      `"Go time!" she shouts, tearing off across the courtyard. You dash after her, weaving through flowerbeds and ducking banners. Wind rushes past as her laughter echoes, but—oops!—she trips on a loose stone, tumbling into a bush with a giggle fit that shakes the leaves.`
    );
    addToStoryQueue(
      `Help her up, or claim the win?`,
      ["HELP", "RUN"],
      palaceChoice2b
    );
  }
}

function palaceChoice2a(choice) {
  if (choice === "keep") {
    playerAdventureScore += 10;
    adventureRecap.push("Kept the jeweled crown ( +10 points )");
    addToStoryQueue(
      `You hoist the crown, its emeralds sparkling like green flames. It pulses with power, and as you eye it for your bag, a sharp zap courses through you! The air crackles, and a swirling portal tears open in the throne room, purple edges glowing. "Whoa!" the princess gasps, but the path is set.`
    );
    palaceChoice3("go");
  } else {
    playerAdventureScore += 15;
    adventureRecap.push("Gave back the crown ( +15 points )");
    addToStoryQueue(
      `You toss the crown to the princess, who snags it with a beaming smile. "You’re awesome!" she cheers, plopping it back on. "Take this instead!" She pulls a silver key from a velvet pouch, its starry etchings glinting. "It’s magic—trust me!" she winks.`
    );
    addToStoryQueue(
      `Use the key now, or save it?`,
      ["USE", "SAVE"],
      palaceChoice3a
    );
  }
}

function palaceChoice2b(choice) {
  if (choice === "help") {
    playerAdventureScore += 10;
    adventureRecap.push("Assisted the princess ( +10 points )");
    addToStoryQueue(
      `You halt and pull the princess from the bush, brushing leaves off her dress as she laughs. "You’re cool!" she says, catching her breath. "Here’s a thank-you!" She hands you a silver key from her pocket, stars etched into its surface. "It’s got magic—promise!"`
    );
    palaceChoice3a("use");
  } else {
    addToStoryQueue(
      `You charge on, vaulting a fountain to win as the princess scrambles up, still chuckling. "You got me!" she calls, dusting her knees. She jogs over, tossing you a dented gold coin. "That’s got some juice—use it well!" It warms your palm with a faint glow.`
    );
    innChoice4("keep");
  }
}

function palaceChoice3a(choice) {
  if (choice === "use") {
    playerAdventureScore += 15;
    adventureRecap.push("Activated the starry key ( +15 points )");
    playSound("zap");
    addToStoryQueue(
      `You twist the starry key in the air, and a deep hum ripples through the courtyard. The ground quakes as a glowing gate rises from the stones, silver light pulsing along its frame. "I knew it!" the princess claps. "Your ticket out—or to somewhere wild!" she grins, stepping aside.`
    );
    palaceChoice3("go");
  } else {
    addToStoryQueue(
      `You stash the key, planning to use it later. The princess tilts her head, then shrugs. "Suit yourself, but why wait?" She snaps her fingers, and the floor rumbles—a trapdoor swings open, revealing a shimmering portal below. "Go for it, hero!" she urges.`
    );
    palaceChoice3("go");
  }
}

function palaceChoice3(choice) {
  if (choice === "go") {
    playerAdventureScore += 25;
    adventureRecap.push("Returned home via portal ( +25 points )");
    playSound("win");
    addToStoryQueue(
      `You leap into the portal with a shout, the world spinning in a dazzling blur of light and sound. Winds howl as you hurtle through a starry tunnel, then—BAM!—you land on soft grass back home. The palace fades like a dream, but what a legendary trip!`
    );
    endStory();
  }
}

// Sky Islands Story
/* Launches the sky islands adventure */
function startSkyIslands(choice) {
  if (choice === "no") {
    playerAdventureScore += 5;
    adventureRecap.push("Rested on the sky island ( +5 points )");
    addToStoryQueue(
      `You flop onto the island’s edge, legs dangling over a sea of swirling clouds below. A crisp breeze tousles your hair, carrying the faint hum of the floating rocks around you. A fluffy cloud puffs by, whispering, "Don’t miss the wonders up here!" with a playful nudge.`
    );
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Embraced the sky’s mysteries ( +10 points )");
    addToStoryQueue(
      `You spring up, eager to roam this sky-bound realm. The island thrums beneath your feet, chunks of stone drifting like satellites in a boundless blue expanse streaked with gold. You’re atop the world—literally—and adventure calls!`
    );
  }
  addToStoryQueue(
    `Scanning the island, three spots grab you: a gleaming lake with water rippling upward, a lush forest aglow with emerald light, and a rugged peak trailing smoke, hinting at a dragon’s den.`
  );
  addToStoryQueue(
    `Where to next?`,
    ["LAKE", "FOREST", "DRAGON"],
    skyLocationChoice
  );
}

/* Directs player to chosen sky islands location */
function skyLocationChoice(choice) {
  currentLocation = choice;
  setBackgroundImage("Sky Islands", choice);
  if (choice === "lake") {
    playerAdventureScore += 10;
    adventureRecap.push("Dived into the sky lake ( +10 points )");
    skyLake();
  } else if (choice === "forest") {
    playerAdventureScore += 15;
    adventureRecap.push("Explored the glowing forest ( +15 points )");
    skyForest();
  } else {
    playerAdventureScore += 20;
    adventureRecap.push("Faced the dragon’s peak ( +20 points )");
    skyDragon();
  }
}

/* Lake storyline with aerial aquatic adventures */
function skyLake() {
  playSound("splash");
  addToStoryQueue(
    `You stride to the lake, a marvel of sparkling water under an impossibly blue sky. Winged fish flit above, leaving silver trails that drift upward in defiance of gravity. The air buzzes with a strange, joyful energy that tickles your skin.`
  );
  addToStoryQueue(
    `A shimmering fish swoops near, scales flashing like coins. "Hey, you!" it chirps brightly. "Swim with me in this topsy-turvy water, or fish for sky treasures? I’ve got shinies hidden below!" It flips midair, eager for your answer.`
  );
  addToStoryQueue(`What’s your move?`, ["SWIM", "FISH"], lakeChoice1);
}

function lakeChoice1(choice) {
  if (choice === "swim") {
    playerAdventureScore += 15;
    adventureRecap.push("Swam with aerial fish ( +15 points )");
    addToStoryQueue(
      `You plunge into the lake, and it’s unreal—warm, light water cradles you like a cloud! The fish zips ahead, guiding you through loops of floating bubbles and past rocks pulsing with color. It darts into a submerged cave, tail flicking. "More this way!" it bubbles, beckoning you on.`
    );
    addToStoryQueue(
      `Follow into the cave, or keep swimming?`,
      ["CAVE", "SWIM"],
      lakeChoice2a
    );
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Fished for sky treasures ( +10 points )");
    addToStoryQueue(
      `The fish tosses you a crude rod—stick and shimmering thread. You cast it upward, and it snags something heavy. With a yank, you reel in a glowing rock, fist-sized, swirling with blue-purple light like a trapped galaxy.`
    );
    addToStoryQueue(
      `Keep this radiant rock, or throw it back?`,
      ["KEEP", "TOSS"],
      lakeChoice2b
    );
  }
}

function lakeChoice2a(choice) {
  if (choice === "cave") {
    playerAdventureScore += 15;
    adventureRecap.push("Ventured into the cave ( +15 points )");
    addToStoryQueue(
      `You swim hard after the fish, squeezing into the cave’s tight entrance. Crystals gleam along the walls, lighting the water like a starry night. A plump green frog croaks from a ledge. "Ribbit! Brave swimmer! The forest up top holds clues to escape this sky!"`
    );
    skyForest();
  } else {
    addToStoryQueue(
      `You skip the cave, flipping through the water with glee. The fish splashes around you, giggling. "You’re a blast!" it chirps, "but the dragon’s peak has the real goodies—like a ride home! Go peek!"`
    );
    skyDragon();
  }
}

function lakeChoice2b(choice) {
  if (choice === "keep") {
    playerAdventureScore += 10;
    adventureRecap.push("Retained the glowing rock ( +10 points )");
    addToStoryQueue(
      `You grip the rock, its hum sending warmth up your arms. The light shifts, sketching a map across its surface—lines pointing to the forest! The fish pouts. "Fine, keep it! But my stash is better!"`
    );
    skyForest();
  } else {
    addToStoryQueue(
      `You hurl the rock back with a splash, and the fish dives after it, laughing wildly. "Mine now!" it crows, then rockets up, zooming toward the mountain. "Catch me if you dare!" it teases, leaving bubbles in its wake.`
    );
    addToStoryQueue(
      `Chase the fish, or let it go?`,
      ["CHASE", "GO"],
      lakeChoice3
    );
  }
}

function lakeChoice3(choice) {
  if (choice === "chase") {
    playerAdventureScore += 15;
    adventureRecap.push("Pursued the swift fish ( +15 points )");
    addToStoryQueue(
      `You dash along the lake’s edge, leaping onto a floating rock to tail the fish. It weaves through clouds, but you climb slippery stones and snag its tail! It squeaks, dropping you at the dragon’s lair with a laugh before darting off.`
    );
    skyDragon();
  } else {
    addToStoryQueue(
      `You watch the fish vanish with a smirk. A plump bird lands beside you, feathers fluffed. "That fish is bonkers!" it squawks. "Forest’s got real stuff—weird finds to guide you!"`
    );
    skyForest();
  }
}

/* Forest storyline with glowing mysteries */
function skyForest() {
  addToStoryQueue(
    `You enter the forest, stepping into a dreamscape. Towering trees stretch into the clouds, bark pulsing with green light like a heartbeat. Vines dangle sparkling fruits, and moss carpets the ground, soft underfoot. It’s quiet, but you sense watchful eyes.`
  );
  addToStoryQueue(
    `A squirrel with a bushy tail hops onto a branch, clutching a glowing nut. "Hey there!" it squeaks. "Climb up for a peek, or search below for goodies? This place is packed with surprises!"`
  );
  addToStoryQueue(`Climb or search?`, ["CLIMB", "SEARCH"], forestChoice1);
}

function forestChoice1(choice) {
  if (choice === "climb") {
    playerAdventureScore += 15;
    adventureRecap.push("Scaled a luminous tree ( +15 points )");
    addToStoryQueue(
      `You grab a branch and climb, the tree’s glow warming your hands. Rough bark steadies you as you ascend past glass-winged bugs. At the top, a silver-vined nest cradles a pearlescent egg. The squirrel scurries up. "Whoa, rare find!"`
    );
    addToStoryQueue(
      `Take the egg, or leave it?`,
      ["TAKE", "LEAVE"],
      forestChoice2a
    );
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Searched the forest floor ( +10 points )");
    addToStoryQueue(
      `You kneel, rummaging through moss and odd mushrooms. Your fingers brush a buzzing stick, its tip sparking blue like a live wire. The squirrel hops near. "Careful—that’s got punch!"`
    );
    addToStoryQueue(`Poke it, or drop it?`, ["POKE", "DROP"], forestChoice2b);
  }
}

function forestChoice2a(choice) {
  if (choice === "take") {
    playerAdventureScore += 10;
    adventureRecap.push("Claimed the shiny egg ( +10 points )");
    addToStoryQueue(
      `You lift the egg, warm and pulsing in your hands. CRACK! It hatches—a tiny dragon, small as your palm, emerges, scales glinting. It nuzzles you, flaps its wings, and tugs your shirt toward the mountain. "Follow me!" it seems to chirp.`
    );
    skyDragon();
  } else {
    addToStoryQueue(
      `You leave the egg, keeping it safe. The squirrel shrugs, nibbling its nut. "Your call! That was dragon kin. The big one’s up that peak if you’re game!" It points to the smoky summit.`
    );
    skyDragon();
  }
}

function forestChoice2b(choice) {
  if (choice === "poke") {
    playerAdventureScore += 15;
    adventureRecap.push("Triggered the buzzing stick ( +15 points )");
    addToStoryQueue(
      `You jab the stick into the ground—WHOOSH!—a blue beam blasts out, scorching a path through the moss! It streaks toward the mountain, lighting the sky like fireworks. The squirrel yelps, diving for cover. "Told ya—dragon turf now!"`
    );
    skyDragon();
  } else {
    addToStoryQueue(
      `You drop the stick quick—it thuds, sparking faintly before stilling. The squirrel peeks out. "Scaredy-cat! Lake’s got more oddities—those fish love shinies!"`
    );
    skyLake();
  }
}

/* Dragon storyline with a climactic encounter */
function skyDragon() {
  playSound("roar");
  addToStoryQueue(
    `You scale the jagged peak, heat and smoke thickening the air. Rocks crunch as you reach the top, facing a colossal dragon—scales gleam like molten gold. It spreads its wings, eclipsing the sun, and roars, shaking the island. "A bold climber!" it growls, steam billowing from its snout.`
  );
  addToStoryQueue(
    `Its fiery gaze pins you. "Got guts, kid! Fight me to prove your worth, or feed me something good—I’m famished up here!"`
  );
  addToStoryQueue(`Fight or feed?`, ["FIGHT", "FEED"], dragonChoice1);
}

function dragonChoice1(choice) {
  if (choice === "fight") {
    playerAdventureScore += 20;
    adventureRecap.push("Battled the mighty dragon ( +20 points )");
    addToStoryQueue(
      `You brace yourself as the dragon unleashes a fiery torrent! You dive behind a boulder, heat singeing the air. Its tail slams down, shattering stone, but you roll aside, hurling a jagged rock at its snout. It snorts, then laughs—a deep rumble. "Not bad, kid! I like your fire!"`
    );
    addToStoryQueue(
      `It lowers its head, teeth glinting. "Ride with me, or take some treasure?"`
    );
    addToStoryQueue(`Ride or treasure?`, ["RIDE", "TREASURE"], dragonChoice2a);
  } else {
    playerAdventureScore += 15;
    adventureRecap.push("Appeased the dragon with food ( +15 points )");
    addToStoryQueue(
      `You rummage your pockets, pulling a soggy fish from the lake. You toss it high—the dragon snaps it up, chomping loudly before burping smoke! A silver key clatters down, warm from its gut. "Oops!" it rumbles. "Had that in there!"`
    );
    addToStoryQueue(
      `Use the key, or trade it back?`,
      ["USE", "TRADE"],
      dragonChoice2b
    );
  }
}

function dragonChoice2a(choice) {
  if (choice === "ride") {
    playerAdventureScore += 15;
    adventureRecap.push("Soared on the dragon’s back ( +15 points )");
    addToStoryQueue(
      `You scramble onto the dragon’s scales, clinging tight as its wings beat with a thunderous roar! The island shrinks below as you soar through clouds, wind whipping past. "Hold on!" it bellows, diving toward a starry portal. "Home or beyond—here we go!"`
    );
    dragonChoice3("go");
  } else {
    playerAdventureScore += 20;
    adventureRecap.push("Claimed dragon treasure ( +20 points )");
    addToStoryQueue(
      `The dragon nudges a hoard with its claw—gold coins tumble, gems sparkle. It drops a ruby the size of your fist in your hands. "Powerful stuff!" The gem throbs, and a glowing gate opens beside you, crackling with energy. "Your ride, kid!" it grumbles.`
    );
    dragonChoice3("go");
  }
}

function dragonChoice2b(choice) {
  if (choice === "use") {
    playerAdventureScore += 15;
    adventureRecap.push("Unlocked a sky gate ( +15 points )");
    addToStoryQueue(
      `You wipe the slimy key and raise it—it hums, firing a light beam into the clouds! A misty door forms, swirling in the air. The dragon chuckles. "Clever! That’s a cloud gate—takes you where you’re meant to be!"`
    );
    dragonChoice3("go");
  } else {
    addToStoryQueue(
      `You toss the key back—the dragon catches it in its jaws. "Good deal!" it rumbles, gulping it down. "Climb aboard—I’ll fly you instead!" It lowers a wing, grinning as you step up for the ride.`
    );
    dragonChoice2a("ride");
  }
}

function dragonChoice3(choice) {
  if (choice === "go") {
    playerAdventureScore += 25;
    adventureRecap.push("Flew home from the skies ( +25 points )");
    playSound("win");
    addToStoryQueue(
      `You leap into the portal—or onto the dragon—and the world explodes into motion! Clouds blur as you rocket through a tunnel of light, the dragon’s roar fading behind. You crash onto soft grass back home—the sky quest complete!`
    );
    endStory();
  }
}

// Futuristic City Story
/* Initiates the futuristic city adventure with an initial choice */
function startFuturisticCity(choice) {
  if (choice === "no") {
    playerAdventureScore += 5;
    adventureRecap.push("Paused to observe the futuristic city ( +5 points )");
    addToStoryQueue(
      `You lean against a sleek, metallic wall, soaking in the city’s electric pulse. Neon lights flash in a kaleidoscope of colors, drones hum overhead like busy insects, and the air crackles with the hum of technology. A tiny robot rolls up, beeping irritably, "Don’t just stand there—this city’s alive with action!" before zooming off into the chaos.`
    );
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Dove into the high-tech chaos ( +10 points )");
    addToStoryQueue(
      `You stride boldly into the futuristic city, stepping into a sci-fi wonderland! Towering skyscrapers shimmer with glowing panels, hovercars zip through the air with a soft whoosh, and robots clatter along, exchanging beeps and boops. The ground vibrates with raw energy, and you’re ready to plunge into this tech-driven adventure!`
    );
  }
  addToStoryQueue(
    `Your eyes catch three pulsing hotspots: a cafe where robots flip sizzling burgers, a train station with sleek trains vanishing into glowing portals, and a shadowy bunker entrance guarded by a flickering holographic sign.`
  );
  addToStoryQueue(
    `Where are you headed next?`,
    ["CAFE", "TRAIN STATION", "BUNKER"],
    futureLocationChoice
  );
}

/* Routes player to selected futuristic city location */
function futureLocationChoice(choice) {
  currentLocation = choice;
  setBackgroundImage("Futuristic City", choice);
  if (choice === "cafe") {
    playerAdventureScore += 10;
    adventureRecap.push("Explored the buzzing robot cafe ( +10 points )");
    futureCafe();
  } else if (choice === "train station") {
    playerAdventureScore += 15;
    adventureRecap.push(
      "Rushed to the high-speed train station ( +15 points )"
    );
    futureTrain();
  } else {
    playerAdventureScore += 20;
    adventureRecap.push("Snuck into the mysterious bunker ( +20 points )");
    futureBunker();
  }
}

/* Cafe storyline with tech-infused choices */
function futureCafe() {
  playSound("beep"); // Plays a futuristic beep sound
  addToStoryQueue(
    `You stroll into the cafe, and it’s a whirlwind of futuristic flair! Robot chefs with polished arms flip burgers on levitating grills, neon signs buzz with alien-like symbols, and the floor pulses with glowing tiles. The air blends the sizzle of meat with the sharp tang of electric sparks—a bizarre, exhilarating mix.`
  );
  addToStoryQueue(
    `A robot chef rolls up on squeaky wheels, its digital face flashing a grin. "Welcome, human!" it buzzes cheerfully. "Try my zap-burgers—they’ll electrify you! Or hit the race-o-tron over there for a game. What’s your pick?" It points to a glowing arcade machine humming in the corner.`
  );
  addToStoryQueue(
    `Eat or game—what’s your choice?`,
    ["EAT", "GAME"],
    cafeChoice1
  );
}

/* Handles the player's cafe decision */
function cafeChoice1(choice) {
  if (choice === "eat") {
    playerAdventureScore += 10;
    adventureRecap.push("Tasted the electrifying zap-burger ( +10 points )");
    addToStoryQueue(
      `The robot slaps a burger on a plate—it glows faintly green, practically buzzing with energy! You take a big bite, and ZAP—your tongue tingles like it’s hit a live circuit! Sparks dance in your mouth, and your whole body lights up with a neon green glow, turning the cafe into a light show. "Whoa!" the robot beeps, spinning in delight. "You’re juiced up now!"`
    );
    addToStoryQueue(
      `Show off your new glow, or dig in for more?`,
      ["SHOW", "EAT"],
      cafeChoice2a
    );
  } else {
    playerAdventureScore += 15;
    adventureRecap.push("Won a high-tech racing game ( +15 points )");
    addToStoryQueue(
      `You dash to the race-o-tron, a sleek rig with flashing buttons and a holographic track. You slam the start button, and tiny robot racers zip across the screen! Your fingers fly, dodging laser barriers and ramps—BOOM, you win! The machine spits out a shiny microchip, and the chef rolls over. "Sweet moves! That’s a power chip!"`
    );
    addToStoryQueue(
      `Keep the chip, or trade it for something else?`,
      ["KEEP", "TRADE"],
      cafeChoice2b
    );
  }
}

/* Follow-up choices after eating the zap-burger */
function cafeChoice2a(choice) {
  if (choice === "show") {
    playerAdventureScore += 10;
    adventureRecap.push("Flaunted your glowing aura ( +10 points )");
    addToStoryQueue(
      `You flex your glowing arms, the green light flaring brighter and casting wild shadows across the cafe! Robots beep and spin in excitement, and one shouts, "That’s bunker-grade energy, kid! Head down there for the real tech!" Its words echo as you bask in the cheers, feeling like a neon superstar.`
    );
    futureBunker();
  } else {
    playerAdventureScore += 5;
    adventureRecap.push("Ate another zap-burger ( +5 points )");
    addToStoryQueue(
      `You grab another zap-burger, chomping down as the sparks flare again. Your glow intensifies, transforming you into a walking beacon of green light! The chef rolls closer, its screen blinking rapidly. "You’re a power plant now! The train station’s got wild rides if you’re buzzing for more!"`
    );
    futureTrain();
  }
}

/* Follow-up choices after winning the game */
function cafeChoice2b(choice) {
  if (choice === "keep") {
    playerAdventureScore += 10;
    adventureRecap.push("Kept the powerful microchip ( +10 points )");
    addToStoryQueue(
      `You pocket the microchip, and it hums softly, vibrating with potential. A holographic map flickers across its surface, tracing a path straight to the train station! The chef nods its metallic head. "That’s your ticket anywhere—trains will blast you to the good stuff!"`
    );
    futureTrain();
  } else {
    playerAdventureScore += 5;
    adventureRecap.push("Traded the chip for a robot buddy ( +5 points )");
    addToStoryQueue(
      `You hand the chip back to the chef, who swaps it for a tiny robot companion—a rolling ball with googly eyes that beep excitedly. "This guy’s your pal now!" it buzzes, darting toward the bunker entrance. "Secrets await down there!" the chef calls as you chase after your new friend.`
    );
    futureBunker();
  }
}

/* Train station storyline with high-speed challenges */
function futureTrain() {
  addToStoryQueue(
    `You sprint into the train station, and it’s a glorious chaos of motion! Sleek silver trains glide on magnetic tracks, vanishing into glowing portals with a sharp whoosh. The air crackles with static electricity, and a giant holographic screen flashes destinations in cryptic, shifting symbols. Drones zip overhead, scanning the crowd with red beams like futuristic guards.`
  );
  addToStoryQueue(
    `A clunky train bot lumbers up, its body a tangle of gears and wires. "All aboard!" it glitches out in a robotic voice. "Ride my turbo-train for a wild trip, or fix this busted wheel—I’m wobbling like crazy!" It points a claw at a sparking tire on its side, tilting dangerously.`
  );
  addToStoryQueue(
    `Ride or repair—what’s your move?`,
    ["RIDE", "FIX"],
    trainChoice1
  );
}

/* Handles the player's train station decision */
function trainChoice1(choice) {
  if (choice === "ride") {
    playerAdventureScore += 15;
    adventureRecap.push("Took a thrilling turbo-train ride ( +15 points )");
    addToStoryQueue(
      `You hop into the train’s glossy cockpit, and it lurches forward with a ferocious roar! The tunnel outside blurs into streaks of blinding light as you rocket through a portal. Junk—old drones and broken bot parts—flies toward you, and the bot screeches, "Duck or gun it!" Your heart pounds as you make your call.`
    );
    addToStoryQueue(
      `Dodge the debris, or speed through it?`,
      ["DODGE", "SPEED"],
      trainChoice2a
    );
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Repaired the train bot’s wheel ( +10 points )");
    addToStoryQueue(
      `You crouch beside the bot, grabbing a wrench from its toolkit. The wheel’s a mess of sparks and dents, but you hammer it back into shape, tightening bolts as sparks fly. It spins smoothly, and the bot whirs happily. "Fixed up nice! Take this ticket—use it smart!" It hands you a glowing pass.`
    );
    addToStoryQueue(
      `Use the ticket now, or save it for later?`,
      ["USE", "SAVE"],
      trainChoice2b
    );
  }
}

/* Follow-up choices after choosing to ride the train */
function trainChoice2a(choice) {
  if (choice === "dodge") {
    playerAdventureScore += 15;
    adventureRecap.push("Dodged obstacles in the train tunnel ( +15 points )");
    addToStoryQueue(
      `You duck and weave, narrowly avoiding hunks of metal whizzing past your head! A rogue drone smashes into the window, cracking glass, but you lean just in time. The train screeches as a glowing portal flares ahead—your way home! "Nice moves!" the bot cheers as you brace for the jump.`
    );
    trainChoice3("go");
  } else {
    playerAdventureScore += 5;
    adventureRecap.push("Sped through the chaos ( +5 points )");
    addToStoryQueue(
      `You slam the speed controls, and the train surges forward, crashing through junk like a battering ram! Sparks erupt as drones explode against the hull, and—CRASH!—you derail into a dark tunnel, tumbling out at the bunker’s edge. "Well, that’s one way to travel!" the bot groans.`
    );
    futureBunker();
  }
}

/* Follow-up choices after repairing the train */
function trainChoice2b(choice) {
  if (choice === "use") {
    trainChoice2a("dodge"); // Reuses the dodge path for consistency
  } else {
    playerAdventureScore += 5;
    adventureRecap.push("Saved the ticket for later ( +5 points )");
    addToStoryQueue(
      `You tuck the ticket away, eyeing it for future use. The bot tilts its head. "Smart move! The bunker’s got secrets worth digging into—heard they’ve got portal tech stashed there!" It rolls off, leaving you amid the station’s hum, pondering your next step.`
    );
    futureBunker();
  }
}

/* Finalizes the train ride and ends the storyline */
function trainChoice3(choice) {
  if (choice === "go") {
    playerAdventureScore += 25;
    adventureRecap.push("Zoomed home via turbo-train ( +25 points )");
    playSound("win");
    addToStoryQueue(
      `You grip the seat as the train dives into the portal, lights flashing like a wild rave! The world twists as you blast through a neon tunnel, the bot whooping behind you. With a final jolt, you crash-land back home, sprawled on the grass with the city’s buzz still ringing in your ears—what a ride!`
    );
    endStory();
  }
}

/* Bunker storyline with underground tech mysteries */
function futureBunker() {
  playSound("beep");
  addToStoryQueue(
    `You slip through a rusty hatch into the bunker, stepping into a shadowy sci-fi lair. Dim lights flicker over rows of whirring machines, screens blinking with glitchy code, and the air hums with the scent of ozone and oil. A scientist bot—half wires, half metal—clanks toward you, its single red eye glowing menacingly.`
  );
  addToStoryQueue(
    `"Intruder!" it buzzes, then pauses. "Wait—you look handy! Test my new gadget—it’s a wild one—or sneak out before I zap you for trespassing!" Its claw twitches, clutching a sparking device.`
  );
  addToStoryQueue(
    `Test it or sneak—what’s your plan?`,
    ["TEST", "SNEAK"],
    bunkerChoice1
  );
}

/* Handles the player's bunker decision */
function bunkerChoice1(choice) {
  if (choice === "test") {
    playerAdventureScore += 15;
    adventureRecap.push("Tested the bot’s experimental gadget ( +15 points )");
    addToStoryQueue(
      `You snatch the gadget—a boxy contraption bristling with wires—and hit the big red button. It whirs, then SPARKS fly everywhere! The bot cackles as a portal rips open in the wall, swirling with purple light and sucking in loose bolts like a vacuum. "That’s my masterpiece!" it screeches, thrilled.`
    );
    addToStoryQueue(
      `Jump through the portal, or tweak the gadget further?`,
      ["JUMP", "TWEAK"],
      bunkerChoice2a
    );
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Snuck out of the bunker ( +10 points )");
    addToStoryQueue(
      `You duck behind a crate, creeping past the bot as it mutters about "test subjects." Your foot snags a wire—CLANG!—and you stumble out the hatch, landing by the train station! A train rolls up, doors hissing open, as the bot’s angry beeps fade behind you.`
    );
    futureTrain();
  }
}

/* Follow-up choices after testing the gadget */
function bunkerChoice2a(choice) {
  if (choice === "jump") {
    playerAdventureScore += 20;
    adventureRecap.push("Leapt through the bunker portal ( +20 points )");
    playSound("zap");
    addToStoryQueue(
      `You dive headfirst into the portal, and it’s like plunging through a lightning storm! Purple bolts crackle around you as you spin through a void, the bot’s voice echoing, "See ya, tester!"—BOOM!—you slam into soft dirt back home, the bunker a distant echo.`
    );
    bunkerChoice3("go");
  } else {
    playerAdventureScore += 10;
    adventureRecap.push("Adjusted the gadget’s settings ( +10 points )");
    addToStoryQueue(
      `You twist a dial on the gadget, and it hums louder, the portal stabilizing with a brighter glow. The bot rolls closer, eye wide. "Ooh, you’re good! It’s steady now—ready when you are!" The purple swirl beckons with a solid hum.`
    );
    addToStoryQueue(`Go through now, or wait?`, ["GO", "WAIT"], bunkerChoice2b);
  }
}

/* Follow-up choices after tweaking the gadget */
function bunkerChoice2b(choice) {
  if (choice === "go") {
    bunkerChoice2a("jump"); // Reuses the jump path for consistency
  } else {
    playerAdventureScore += 5;
    adventureRecap.push("Delayed and got zapped to the station ( +5 points )");
    addToStoryQueue(
      `You pause, eyeing the portal warily. The bot sighs, gears grinding. "Fine, I’ll push it!" It zaps the gadget with a claw, and a beam flings you to the train station! You land in a heap by the tracks, the bot’s laughter fading as a train pulls up.`
    );
    futureTrain();
  }
}

/* Finalizes the bunker adventure and ends the storyline */
function bunkerChoice3(choice) {
  if (choice === "go") {
    playerAdventureScore += 25;
    adventureRecap.push("Warped home from the bunker ( +25 points )");
    playSound("win");
    addToStoryQueue(
      `You tumble through the portal’s final surge, the world flipping in a flash of light! Machines fade as you soar through a neon tunnel, landing with a thud on your own lawn. The bunker’s tech zapped you home—what a wild sci-fi ride!`
    );
    endStory();
  }
}
