# Artwork Prompts

Prompts for every illustration in the codex, written so the whole book looks like the work of one engraver. They describe each creature rather than naming it, and avoid film and licensed designs (see **Avoid** under each beast).

> **Status (2026-09-25): all 49 illustrations are done** (16 plates, 32 sketches, frontispiece). Keep these prompts for regenerating any image or illustrating new entries.

## How to use

1. **Start a new chat** in the image generator and paste the **Session opener** below. It sets the style and the exclusions for every image in that chat.
2. **Send one subject prompt at a time** from the beasts below. Each says which file to save.
3. If the style drifts (colour creeping into sketches, backgrounds appearing, text sneaking in), paste the Session opener again, or start a fresh chat for the next beast.
4. Save each image to `frontend/art-originals/` with the name given, run `npm run art` in `frontend/`, and check the entry on the page.

Any aspect ratio works; the page fits each image to its frame.

## Session opener

```
For every image I ask for in this conversation, use this exact style:

Antique natural-history engraving, as if from a 17th-century bestiary. Fine pen-and-ink linework with dense cross-hatching and stippling for shadow, in dark sepia-black ink on a plain pure-white background. Scientific-illustration composition: the subject centred and fully in frame, with generous empty white margin on all sides. Hand-drawn, slightly irregular lines, no digital gradients.

Colour: ink only, unless my request names a single restrained hand-tinted accent, like a hand-coloured antique print.

Never include: text, lettering, captions, labels or signatures; a border or frame; parchment or paper texture; photorealism, 3D rendering, or film or video-game concept-art style; people.

Reply "Ready" and wait for my first subject.
```

---

## ✅ Balrog: done

`balrog-plate` · `flame-whip` · `horn-structure`

## Werewolf

Plate done (`werewolf-plate`).

**`werewolf-jaw`: Jaw and fangs (detail)**
```
Subject: an anatomical study of a huge wolf's jaw seen from the side, mouth open: long curved canine fangs, jagged rows of teeth, ridged gums and the heavy bone of the lower jaw. Centred, no body. Ink only, no tint.
```

**`werewolf-paw`: Forepaw (underside)**
```
Subject: a specimen study of a single huge wolf's forepaw seen from beneath: thick leathery pads, long hooked claws, coarse fur around the edges. No leg or body. Ink only, no tint.
```

## Orc

> **Avoid:** the films' prosthetic orc designs. Keep them squat and brutish, as described in the books.

**`orc-plate`**
```
Subject: a squat, broad, long-armed goblin-like warrior with a flat nose, wide fanged mouth and slanted eyes, sallow and scarred, crouched in a menacing half-crouch on a rubble of broken stone, gripping a curved blade. Crude, mismatched armour of iron plates and leather. Colour: a restrained wash of dull, sickly yellow in the eyes only.
```

**`orc-scimitar`: Scimitar (detail)**
```
Subject: a specimen study of a single crude curved sword with a broad notched blade, a wrapped leather grip and a rough iron crossguard, laid diagonally. No hand. Ink only, no tint.
```

**`orc-helm`: Helm of Mordor (side view)**
```
Subject: a crude dented iron war-helm seen from the side, with a beak-like nose guard, rivets and a ragged leather neck-flap. No emblems or symbols. Centred, no head inside. Ink only, no tint.
```

## Uruk-hai

> **Avoid:** the films' white handprint painted across the face. The white hand belongs on the shield only.

**`uruk-hai-plate`**
```
Subject: a tall, powerful soldier-orc, black-skinned and heavily muscled, standing upright and disciplined in dark iron armour, holding a short broad-bladed sword and a tall black shield at its side. Stern, cruel face with a heavy brow. Standing on flat rocky ground in full daylight. Colour: ink only, except a restrained hand-tinted wash of pale ivory white on the small hand emblem at the centre of the shield.
```

**`uruk-shield`: Shield of the White Hand**
```
Subject: a specimen study of a tall black war-shield seen from the front, battered and studded, with a small plain white open hand painted at its centre. No figure. Colour: ink only, except a pale ivory wash on the small hand emblem.
```

**`uruk-sword`: Short broad-bladed sword**
```
Subject: a specimen study of a short, heavy, broad-bladed sword with a straight thick blade, a plain crossguard and a leather-wrapped hilt, laid diagonally. No hand. Ink only, no tint.
```

## Stone-troll

> **Avoid:** the three trolls' designs from the Hobbit films.

**`stone-troll-plate`**
```
Subject: a hulking, lumpish giant with grey warty hide, a huge head, tiny eyes and a heavy jaw, caught at the moment of dawn: its lower half already turned to cracked grey stone rooted in the ground, its upper body still straining with one arm raised against the rising light. Colour: ink only, except a restrained wash of pale dawn gold in the light striking its shoulders.
```

**`troll-hand`: Hand (scale with a hobbit)**
```
Subject: a naturalist's scale study: a single enormous gnarled troll hand, open palm down, with thick cracked nails, beside a small child-sized walking-cloak laid flat for scale. No people. Ink only, no tint.
```

**`troll-hide`: Petrified hide (detail)**
```
Subject: a close study of a patch of troll hide turning to stone, warty skin on one side cracking into rough granite with lichen on the other. Specimen layout, centred. Ink only, no tint.
```

## Olog-hai

**`olog-hai-plate`**
```
Subject: a towering, black-skinned troll with a scaled hide like armour, cunning eyes and a fierce snarl, standing upright in daylight holding a great iron war-hammer and a round black shield. Heavier and more upright than a common troll, with an air of fierce intelligence. Colour: ink only, except a restrained wash of ember orange in the eyes.
```

**`olog-hammer`: War-hammer (detail)**
```
Subject: a specimen study of a huge iron war-hammer with a massive square head, spikes on the back, and a long iron-banded haft, laid diagonally. No hand. Ink only, no tint.
```

**`olog-hide`: Scaled hide (detail)**
```
Subject: a close study of a patch of dark, overlapping horny scales like rough armour plates, with scars and ridges. Specimen layout, centred. Ink only, no tint.
```

## Great Spider

> **Avoid:** the Shelob and Mirkwood spider designs from the films.

**`great-spider-plate`**
```
Subject: an enormous, bloated spider with a swollen black body, long bristled jointed legs and clusters of gleaming eyes, crouched at the centre of a vast thick web strung between gnarled dark tree trunks. Colour: ink only, except a restrained wash of sickly pale green in the eyes.
```

**`spider-spinnerets`: Spinnerets (detail)**
```
Subject: an anatomical study of the underside tip of a giant spider's abdomen, showing its spinnerets drawing out thick strands of silk that trail across the page. Ink only, no tint.
```

**`spider-eyes`: Eye cluster (front view)**
```
Subject: an anatomical study of a giant spider's head seen straight from the front: a cluster of many round glossy eyes of different sizes, bristles and curved fangs beneath. Centred, no body. Ink only, no tint.
```

## Warg

**`warg-plate`**
```
Subject: a huge, heavy-shouldered wolf, broader and more brutish than any natural wolf, with a coarse shaggy coat, a massive head and bared teeth, standing on a rocky hillside. A crude, empty leather riding harness is strapped around its chest. Colour: ink only, except a restrained wash of faded rust red on the leather harness.
```

**`warg-skull`: Skull (side view)**
```
Subject: an anatomical study of a huge wolf's skull seen from the side, with a heavy brow ridge, long fangs and a thick jaw. Centred, no body. Ink only, no tint.
```

**`warg-tracks`: Tracks in snow**
```
Subject: a naturalist's study of a trail of enormous wolf pawprints pressed into snow, crossing the page diagonally, each print showing pads and claw marks. Ink only, no tint.
```

## Fell Beast

> **Avoid:** the films' wyvern design, and never include a rider.

**`fell-beast-plate`**
```
Subject: a vast winged creature out of an older world, naked and featherless, its great wings made of webs of hide stretched between horned finger-bones, a long snaking neck and a cruel beaked head, perched on a jagged crag with wings half-spread. Colour: ink only, except a restrained wash of dull bruised violet in the wing membranes.
```

**`fell-beast-wing`: Wing membrane (detail)**
```
Subject: an anatomical study of a section of a huge leathery wing: thin hide stretched between long horned finger-bones, veined and torn at the edge. Ink only, no tint.
```

**`fell-beast-talon`: Talon (detail)**
```
Subject: a specimen study of a single huge scaled foot with long hooked black talons, gripping a small rock. No body. Ink only, no tint.
```

## Oliphaunt

> **Avoid:** the films' four-tusked design. Use two great tusks.

**`oliphaunt-plate`**
```
Subject: an immense grey beast like a war-elephant but far larger, with two great curving tusks, a long trunk raised, and wrinkled hide, bearing a tall wooden war-tower on its back hung with tattered banners. No riders. Colour: ink only, except a restrained wash of faded scarlet on the banners.
```

**`oliphaunt-tusk`: Tusk (detail)**
```
Subject: a specimen study of a single enormous curved ivory tusk, cracked and scarred, bound near its base with an iron band. Laid diagonally. Ink only, no tint.
```

**`oliphaunt-tower`: War-tower (rigging)**
```
Subject: a technical study of a wooden war-tower built to be strapped to a giant beast's back: planked platform, railings, ropes and cinches, drawn as a diagram. No people, no animal. Ink only, no tint.
```

## Watcher in the Water

> **Avoid:** the film design, and especially the carved emblems and inscriptions of the famous Moria doors, which come from Tolkien's own copyrighted drawing. Keep the gate plain.

**`watcher-plate`**
```
Subject: a dark, still pool at the foot of a sheer cliff, from which many long, pale, sinuous tentacles rise and writhe above the water, reaching toward the shore. The body stays hidden beneath the black surface. Colour: ink only, except a restrained wash of sickly pale green in the tentacles.
```

**`watcher-tentacle`: Tentacle (underside)**
```
Subject: an anatomical study of the underside of a long tentacle, curling across the page, with rows of suckers and fine ridges. Ink only, no tint.
```

**`watcher-west-gate`: The West-gate of Moria**
```
Subject: a plain, closed stone doorway set into a sheer cliff face, flanked by two holly trees, with a dark pool and a few broken rocks in front of it. The door is smooth and bare with no carvings, emblems or writing. Ink only, no tint.
```

## Fire-drake

> **Avoid:** the films' Smaug, and Tolkien's own dragon drawings, which are copyrighted.

**`fire-drake-plate`**
```
Subject: a great serpentine dragon with armoured scales, folded bat-like wings, a long spined tail and smoke curling from its nostrils, coiled upon a mountainous heap of treasure: coins, cups and crowns. Its half-lidded eye is sly and watchful. Colour: ink only, except restrained washes of burnished gold in the treasure and ember orange in its smouldering breath.
```

**`fire-drake-scales`: Scale armour (detail)**
```
Subject: a close study of a patch of large overlapping dragon scales like layered armour plates, ridged and hard. Specimen layout, centred. Ink only, no tint.
```

**`fire-drake-breast`: Bare patch of the breast**
```
Subject: a close study of a dragon's underbelly, crusted with embedded gems and scales, with one small bare patch of soft skin left uncovered near the left breast. Specimen layout, centred. Ink only, no tint.
```

## Cold-drake

**`cold-drake-plate`**
```
Subject: a long, wingless serpentine dragon with no fire, heavy-jawed and claw-footed, its body coiled among snow-covered boulders on a bleak mountainside, frost on its scales. Colour: ink only, except a restrained wash of cold pale blue-grey in the frost.
```

**`cold-drake-claw`: Claw (detail)**
```
Subject: a specimen study of a single massive scaled dragon foot with four long curved claws, frost clinging to the scales. No body. Ink only, no tint.
```

**`cold-drake-coil`: Coiled form (top view)**
```
Subject: a naturalist's diagram of a long wingless dragon seen from directly above, lying coiled in a loose spiral, showing its full length. Ink only, no tint.
```

## Ent

> **Avoid:** the films' Treebeard design.

**`ent-plate`**
```
Subject: a tall, tree-like giant, roughly man-shaped, with bark-covered limbs, a trunk-like body, long gnarled fingers and a long beard of twigs and grey-green moss, striding slowly through a forest. Its deep eyes seem ancient and patient. Colour: ink only, except a restrained wash of soft leaf green in the moss and the light of its eyes.
```

**`ent-bark`: Bark-skin (detail)**
```
Subject: a close study of a patch of thick, deeply furrowed bark with moss and small twigs growing from it, drawn as living skin. Specimen layout, centred. Ink only, no tint.
```

**`ent-eyes`: Eyes (front view)**
```
Subject: a close study of two deep, ancient eyes set in a face of gnarled bark and twigs, seen straight from the front, with a mossy brow. Ink only, no tint.
```

## Huorn

**`huorn-plate`**
```
Subject: a dark, gnarled, ancient tree standing in shadow at the edge of a grove, its trunk twisted into the faint suggestion of a watching face, its roots creeping across the ground like reaching fingers. Colour: ink only, except a restrained wash of deep moss green in the leaves.
```

**`huorn-roots`: Grasping roots (detail)**
```
Subject: a study of thick, twisting tree roots breaking out of the soil and curling like grasping hands around a stone. Ink only, no tint.
```

**`huorn-grove`: Grove at dusk**
```
Subject: a small landscape study of a dense grove of dark, crowded trees at dusk, shadowy and forbidding, with no path leading in. Ink only, no tint.
```

## Great Eagle

> **Avoid:** the films' eagle designs.

**`great-eagle-plate`**
```
Subject: an enormous, noble eagle with vast outstretched wings, alighting on a sharp mountain peak above the clouds, head turned in profile, keen-eyed and majestic. Colour: ink only, except a restrained wash of warm golden brown in the feathers of its head and neck.
```

**`eagle-feather`: Primary feather (detail)**
```
Subject: a specimen study of a single huge primary flight feather, long and curved, with detailed vanes and a strong quill, laid diagonally. Ink only, no tint.
```

**`eagle-talons`: Talons (detail)**
```
Subject: a specimen study of a single great eagle's foot with scaled toes and long curved talons, gripping a small branch. No body. Ink only, no tint.
```

## Frontispiece (contents page)

**`frontispiece`**
```
Subject: a scholar's desk by candlelight: a great ancient book lying open on a wooden stand, surrounded by a guttering candle, a quill in an inkpot, a small horned skull, loose feathers, rolled maps and a few stones. No people. Colour: ink only, except a restrained wash of warm candle-flame amber.
```
