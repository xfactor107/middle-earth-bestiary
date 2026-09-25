import type { Category, Era } from '@prisma/client';

// The codex's contents. Entries are ordered on the page by chapter (category),
// then by name, so their order here does not matter.

export const HABITATS = {
  angband: { name: 'Angband', description: 'The ancient underground hell-forge of Morgoth.' },
  mordor: { name: 'Mordor', description: 'The volcanic plateau ruled by Sauron.' },
  mirkwood: { name: 'Mirkwood', description: 'Dense, corrupted woodland.' },
  khazadDum: {
    name: 'Khazad-dûm',
    description: 'The great Dwarf-realm beneath the Misty Mountains, later called Moria.',
  },
  mistyMountains: {
    name: 'Misty Mountains',
    description: 'The long range dividing Eriador from the Vale of Anduin.',
  },
  isengard: {
    name: 'Isengard',
    description: 'The ring-walled fortress of Saruman at the southern end of the Misty Mountains.',
  },
  tolInGaurhoth: {
    name: 'Tol-in-Gaurhoth',
    description: 'The Isle of Werewolves, where Sauron held his captured fortress in the First Age.',
  },
  trollshaws: {
    name: 'Trollshaws',
    description: 'Wild wooded hills east of the Last Bridge in Eriador.',
  },
  wilderland: {
    name: 'Wilderland',
    description: 'The wild lands east of the Misty Mountains.',
  },
  harad: { name: 'Harad', description: 'The hot southern lands beyond Gondor.' },
  erebor: {
    name: 'Erebor',
    description: 'The Lonely Mountain, Dwarf-kingdom seized by the dragon Smaug.',
  },
  greyMountains: {
    name: 'Grey Mountains',
    description: 'The northern range where the cold-drakes bred.',
  },
  fangorn: {
    name: 'Fangorn Forest',
    description: 'The ancient forest at the southern end of the Misty Mountains.',
  },
  oldForest: {
    name: 'Old Forest',
    description: 'A remnant of primeval woodland east of the Shire.',
  },
  crissaegrim: {
    name: 'Crissaegrim',
    description: 'The mountain peaks south of Gondolin where Thorondor kept his eyries.',
  },
} as const;

type HabitatSeed = (typeof HABITATS)[keyof typeof HABITATS];

export interface BestiaryEntry {
  name: string;
  category: Category;
  taxonomy: string;
  originEra: Era;
  master: string | null;
  behavior: string;
  // 1 Negligible · 2 Wary · 3 Perilous · 4 Extreme · 5 Catastrophic
  dangerRating: number;
  description: string;
  // Shown as "Fig. N — <caption>", N being the entry's page in the codex
  figureCaption: string;
  imageUrl: string;
  anatomicalSketches: { title: string; imageUrl: string }[];
  habitats: HabitatSeed[];
  notables: { name: string; title: string | null; status: string }[];
}

export const BESTIARY: BestiaryEntry[] = [
  // ── Maiar ────────────────────────────────────────────────
  {
    name: 'Balrog',
    category: 'MAIAR',
    taxonomy: 'Maiar',
    originEra: 'YEARS_OF_THE_TREES',
    master: 'Morgoth',
    behavior: 'Solitary, territorial, draws to light and sound',
    dangerRating: 4,
    description:
      'A fallen Maia, the Balrog is a being of immense power, wreathed in shadow and flame. It is said to have once served Morgoth.',
    figureCaption: 'The Balrog',
    imageUrl: '/images/balrog-plate.png',
    anatomicalSketches: [
      { title: 'Flame whip (detail)', imageUrl: '/images/flame-whip.png' },
      { title: 'Horn structure (front view)', imageUrl: '/images/horn-structure.png' },
    ],
    habitats: [HABITATS.angband, HABITATS.khazadDum],
    notables: [
      { name: 'Gothmog', title: 'Lord of Balrogs', status: 'Slain' },
      { name: "Durin's Bane", title: 'Terror of Khazad-dûm', status: 'Slain' },
    ],
  },
  {
    name: 'Werewolf',
    category: 'MAIAR',
    taxonomy: 'Fell spirits in wolf-form',
    originEra: 'FIRST_AGE',
    master: 'Sauron',
    behavior: 'Hunts by night, cunning and patient, devours captives one by one',
    dangerRating: 3,
    description:
      'Wolves inhabited by dreadful spirits that Sauron imprisoned in their shapes. They held Tol-in-Gaurhoth for him, where they devoured the companions of Finrod Felagund in the dark.',
    figureCaption: 'The Werewolf',
    imageUrl: '/images/werewolf-plate.png',
    anatomicalSketches: [
      { title: 'Jaw and fangs (detail)', imageUrl: '/images/werewolf-jaw.png' },
      { title: 'Forepaw (underside)', imageUrl: '/images/werewolf-paw.png' },
    ],
    habitats: [HABITATS.tolInGaurhoth, HABITATS.angband],
    notables: [
      { name: 'Draugluin', title: 'Sire of Werewolves', status: 'Slain' },
      { name: 'Carcharoth', title: 'The Red Maw', status: 'Slain' },
    ],
  },

  // ── Orcs ─────────────────────────────────────────────────
  {
    name: 'Orc',
    category: 'ORCS',
    taxonomy: 'Corrupted Elves, bred in darkness',
    originEra: 'YEARS_OF_THE_TREES',
    master: 'Morgoth',
    behavior: 'Swarms in great numbers, shuns sunlight, quarrels among its own kind',
    dangerRating: 2,
    description:
      'Bred by Morgoth in mockery of the Elves, Orcs are cruel, cunning and numerous. They hate the Sun and all things fair, and serve whatever dark power masters them.',
    figureCaption: 'The Orc',
    imageUrl: '/images/orc-plate.png',
    anatomicalSketches: [
      { title: 'Scimitar (detail)', imageUrl: '/images/orc-scimitar.png' },
      { title: 'Helm of Mordor (side view)', imageUrl: '/images/orc-helm.png' },
    ],
    habitats: [HABITATS.mistyMountains, HABITATS.khazadDum, HABITATS.mordor],
    notables: [
      { name: 'Azog', title: 'Slayer of Thrór', status: 'Slain' },
      { name: 'Bolg', title: 'Son of Azog', status: 'Slain' },
      { name: 'The Great Goblin', title: 'Lord of Goblin-town', status: 'Slain' },
      { name: 'Shagrat', title: 'Captain of Cirith Ungol', status: 'Unknown' },
    ],
  },
  {
    name: 'Uruk-hai',
    category: 'ORCS',
    taxonomy: 'Great Orcs',
    originEra: 'THIRD_AGE',
    master: 'Saruman',
    behavior: 'Endures sunlight, marches tirelessly, fights in disciplined ranks',
    dangerRating: 3,
    description:
      'Great soldier-orcs, black and swart, that do not weaken under the Sun. Those of Isengard bore the White Hand of Saruman and made up the host that assailed Helm’s Deep.',
    figureCaption: 'The Uruk-hai',
    imageUrl: '/images/uruk-hai-plate.png',
    anatomicalSketches: [
      { title: 'Shield of the White Hand', imageUrl: '/images/uruk-shield.png' },
      { title: 'Short broad-bladed sword', imageUrl: '/images/uruk-sword.png' },
    ],
    habitats: [HABITATS.isengard, HABITATS.mordor],
    notables: [{ name: 'Uglúk', title: 'Captain of the Isengarders', status: 'Slain' }],
  },

  // ── Trolls ───────────────────────────────────────────────
  {
    name: 'Stone-troll',
    category: 'TROLLS',
    taxonomy: 'Trolls, made in mockery of Ents',
    originEra: 'FIRST_AGE',
    master: 'Morgoth',
    behavior: 'Dull-witted, hoards plunder, turns to stone in daylight',
    dangerRating: 3,
    description:
      'Great brutish creatures made by Morgoth in the Elder Days, said to be counterfeits of the Ents. Sunlight turns them back to the stone from which they were made.',
    figureCaption: 'The Stone-troll',
    imageUrl: '/images/stone-troll-plate.png',
    anatomicalSketches: [
      { title: 'Hand (scale with a hobbit)', imageUrl: '/images/troll-hand.png' },
      { title: 'Petrified hide (detail)', imageUrl: '/images/troll-hide.png' },
    ],
    habitats: [HABITATS.trollshaws, HABITATS.mistyMountains],
    notables: [
      { name: 'Bert', title: 'Of the Trollshaws', status: 'Turned to stone' },
      { name: 'Tom', title: 'Of the Trollshaws', status: 'Turned to stone' },
      { name: 'William', title: 'Of the Trollshaws', status: 'Turned to stone' },
    ],
  },
  {
    name: 'Olog-hai',
    category: 'TROLLS',
    taxonomy: 'Trolls, bred by Sauron',
    originEra: 'THIRD_AGE',
    master: 'Sauron',
    behavior: 'Cunning and fierce, endures the Sun while Sauron’s will holds it',
    dangerRating: 3,
    description:
      'A strong race of trolls bred by Sauron late in the Third Age. Unlike their kin they can endure the Sun while his will holds them, and they came against the Black Gate with great hammers.',
    figureCaption: 'The Olog-hai',
    imageUrl: '/images/olog-hai-plate.png',
    anatomicalSketches: [
      { title: 'War-hammer (detail)', imageUrl: '/images/olog-hammer.png' },
      { title: 'Scaled hide (detail)', imageUrl: '/images/olog-hide.png' },
    ],
    habitats: [HABITATS.mordor],
    notables: [],
  },

  // ── Beasts ───────────────────────────────────────────────
  {
    name: 'Great Spider',
    category: 'BEASTS',
    taxonomy: 'Arachnids of Ungoliant’s brood',
    originEra: 'YEARS_OF_THE_TREES',
    master: null,
    behavior: 'Weaves vast webs in dark places, hunts in swarms, shuns light',
    dangerRating: 3,
    description:
      'Enormous arachnid horrors descended from Ungoliant. They lurk in dark forests and mountain passes, snaring the unwary in webs, and speak in hissing voices.',
    figureCaption: 'The Great Spider',
    imageUrl: '/images/great-spider-plate.png',
    anatomicalSketches: [
      { title: 'Spinnerets (detail)', imageUrl: '/images/spider-spinnerets.png' },
      { title: 'Eye cluster (front view)', imageUrl: '/images/spider-eyes.png' },
    ],
    habitats: [HABITATS.mordor, HABITATS.mirkwood],
    notables: [{ name: 'Shelob', title: 'Her Ladyship of Cirith Ungol', status: 'Unknown' }],
  },
  {
    name: 'Warg',
    category: 'BEASTS',
    taxonomy: 'Wolves of evil mind',
    originEra: 'THIRD_AGE',
    master: null,
    behavior: 'Hunts in packs, speaks a dreadful tongue, rides to war beneath Orcs',
    dangerRating: 2,
    description:
      'Evil wolves of the lands beyond the Great River. They gather in packs by night, speak in a dreadful tongue of their own, and serve as mounts for Orcs in war.',
    figureCaption: 'The Warg',
    imageUrl: '/images/warg-plate.png',
    anatomicalSketches: [
      { title: 'Skull (side view)', imageUrl: '/images/warg-skull.png' },
      { title: 'Tracks in snow', imageUrl: '/images/warg-tracks.png' },
    ],
    habitats: [HABITATS.wilderland, HABITATS.mistyMountains],
    notables: [],
  },
  {
    name: 'Fell Beast',
    category: 'BEASTS',
    taxonomy: 'Winged creatures of an older world',
    originEra: 'THIRD_AGE',
    master: 'the Nazgûl',
    behavior: 'Bears the Nazgûl aloft, casts dread with its shadow',
    dangerRating: 4,
    description:
      'A naked winged creature out of an older world, nurtured by Sauron on fell meats until it grew beyond the measure of all other things that fly. The Nazgûl rode them once their black horses were lost.',
    figureCaption: 'The Fell Beast',
    imageUrl: '/images/fell-beast-plate.png',
    anatomicalSketches: [
      { title: 'Wing membrane (detail)', imageUrl: '/images/fell-beast-wing.png' },
      { title: 'Talon (detail)', imageUrl: '/images/fell-beast-talon.png' },
    ],
    habitats: [HABITATS.mordor],
    notables: [
      { name: 'Steed of the Witch-king', title: 'Mount of the Lord of the Nazgûl', status: 'Slain' },
    ],
  },
  {
    name: 'Oliphaunt',
    category: 'BEASTS',
    taxonomy: 'Mûmakil, great beasts of the South',
    originEra: 'THIRD_AGE',
    master: 'the Haradrim',
    behavior: 'Bears war-towers into battle, maddened when wounded',
    dangerRating: 3,
    description:
      'Enormous grey beasts of the South, tusked and trunked, bearing towers of war upon their backs. The Haradrim drove them against Gondor on the Pelennor Fields, where no horse would face them.',
    figureCaption: 'The Oliphaunt',
    imageUrl: '/images/oliphaunt-plate.png',
    anatomicalSketches: [
      { title: 'Tusk (detail)', imageUrl: '/images/oliphaunt-tusk.png' },
      { title: 'War-tower (rigging)', imageUrl: '/images/oliphaunt-tower.png' },
    ],
    habitats: [HABITATS.harad],
    notables: [],
  },
  {
    name: 'Watcher in the Water',
    category: 'BEASTS',
    taxonomy: 'Unknown, a many-armed thing of the deep',
    originEra: 'THIRD_AGE',
    master: null,
    behavior: 'Lurks in dark water, seizes prey with long tentacles',
    dangerRating: 3,
    description:
      'A many-armed creature that lurked in the dark pool before the West-gate of Moria. When the Fellowship passed the doors it seized Frodo, then tore the gates shut behind them.',
    figureCaption: 'The Watcher in the Water',
    imageUrl: '/images/watcher-plate.png',
    anatomicalSketches: [
      { title: 'Tentacle (underside)', imageUrl: '/images/watcher-tentacle.png' },
      { title: 'The West-gate of Moria', imageUrl: '/images/watcher-west-gate.png' },
    ],
    habitats: [HABITATS.khazadDum],
    notables: [],
  },

  // ── Dragons ──────────────────────────────────────────────
  {
    name: 'Fire-drake',
    category: 'DRAGONS',
    taxonomy: 'Dragons, the Urulóki',
    originEra: 'FIRST_AGE',
    master: 'Morgoth',
    behavior: 'Hoards gold, binds the will with its gaze, breathes fire',
    dangerRating: 5,
    description:
      'Great worms bred by Morgoth in Angband, breathing fire and lusting after gold. Their eyes could bind the will, and their cunning speech was more dangerous than their flame.',
    figureCaption: 'The Fire-drake',
    imageUrl: '/images/fire-drake-plate.png',
    anatomicalSketches: [
      { title: 'Scale armour (detail)', imageUrl: '/images/fire-drake-scales.png' },
      { title: 'Bare patch of the breast', imageUrl: '/images/fire-drake-breast.png' },
    ],
    habitats: [HABITATS.angband, HABITATS.erebor],
    notables: [
      { name: 'Glaurung', title: 'Father of Dragons', status: 'Slain' },
      { name: 'Ancalagon', title: 'The Black', status: 'Slain' },
      { name: 'Smaug', title: 'The Golden', status: 'Slain' },
    ],
  },
  {
    name: 'Cold-drake',
    category: 'DRAGONS',
    taxonomy: 'Dragons without fire',
    originEra: 'THIRD_AGE',
    master: null,
    behavior: 'Crushes and devours, lairs in the northern wastes',
    dangerRating: 4,
    description:
      'Dragons of the Grey Mountains that breathe no fire, yet are strong and ruthless with fang and claw. They warred upon the Dwarves of the North and drove them from their halls.',
    figureCaption: 'The Cold-drake',
    imageUrl: '/images/cold-drake-plate.png',
    anatomicalSketches: [
      { title: 'Claw (detail)', imageUrl: '/images/cold-drake-claw.png' },
      { title: 'Coiled form (top view)', imageUrl: '/images/cold-drake-coil.png' },
    ],
    habitats: [HABITATS.greyMountains],
    notables: [{ name: 'Scatha', title: 'The Worm', status: 'Slain' }],
  },

  // ── Ents ─────────────────────────────────────────────────
  {
    name: 'Ent',
    category: 'ENTS',
    taxonomy: 'Onodrim, shepherds of the trees',
    originEra: 'YEARS_OF_THE_TREES',
    master: null,
    behavior: 'Slow to anger, terrible when roused, guards the forests',
    dangerRating: 2,
    description:
      'Tree-herds who awoke when the Elves awoke, and learned speech from them. Slow and patient, they tend the forests, but roused to wrath they break stone; they overthrew Isengard in a single night.',
    figureCaption: 'The Ent',
    imageUrl: '/images/ent-plate.png',
    anatomicalSketches: [
      { title: 'Bark-skin (detail)', imageUrl: '/images/ent-bark.png' },
      { title: 'Eyes (front view)', imageUrl: '/images/ent-eyes.png' },
    ],
    habitats: [HABITATS.fangorn],
    notables: [
      { name: 'Treebeard', title: 'Fangorn, eldest of the Ents', status: 'Living' },
      { name: 'Quickbeam', title: 'Bregalad', status: 'Living' },
    ],
  },
  {
    name: 'Huorn',
    category: 'ENTS',
    taxonomy: 'Trees grown wild and watchful',
    originEra: 'THIRD_AGE',
    master: null,
    behavior: 'Moves under shadow, smothers its foes in darkness',
    dangerRating: 3,
    description:
      'Trees that have grown almost Ent-like, or Ents grown tree-ish, dark and wild. They stand silent until roused, then move under shadow; after Helm’s Deep they fell upon the fleeing Orcs, and none came out again.',
    figureCaption: 'The Huorn',
    imageUrl: '/images/huorn-plate.png',
    anatomicalSketches: [
      { title: 'Grasping roots (detail)', imageUrl: '/images/huorn-roots.png' },
      { title: 'Grove at dusk', imageUrl: '/images/huorn-grove.png' },
    ],
    habitats: [HABITATS.fangorn, HABITATS.oldForest],
    notables: [{ name: 'Old Man Willow', title: 'Heart of the Old Forest', status: 'Unknown' }],
  },

  // ── Birds ────────────────────────────────────────────────
  {
    name: 'Great Eagle',
    category: 'BIRDS',
    taxonomy: 'Eagles of Manwë',
    originEra: 'FIRST_AGE',
    master: 'Manwë',
    behavior: 'Keeps watch from high eyries, aids the Free Peoples at need',
    dangerRating: 1,
    description:
      'Great eagles sent by Manwë to watch over Middle-earth. They bore Beren and Lúthien out of peril, came to the Battle of Five Armies, and carried Frodo and Sam from the ruin of Mount Doom.',
    figureCaption: 'The Great Eagle',
    imageUrl: '/images/great-eagle-plate.png',
    anatomicalSketches: [
      { title: 'Primary feather (detail)', imageUrl: '/images/eagle-feather.png' },
      { title: 'Talons (detail)', imageUrl: '/images/eagle-talons.png' },
    ],
    habitats: [HABITATS.crissaegrim, HABITATS.mistyMountains],
    notables: [
      { name: 'Thorondor', title: 'King of Eagles', status: 'Unknown' },
      { name: 'Gwaihir', title: 'The Windlord', status: 'Living' },
      { name: 'Landroval', title: 'Brother of Gwaihir', status: 'Living' },
    ],
  },
];
