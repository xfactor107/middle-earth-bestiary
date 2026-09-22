import { PrismaClient, Era } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Middle-earth Bestiary data...');

  const angband = await prisma.habitat.upsert({
    where: { name: 'Angband' },
    update: {},
    create: { name: 'Angband', description: 'The ancient underground hell-forge of Morgoth.' },
  });

  const mordor = await prisma.habitat.upsert({
    where: { name: 'Mordor' },
    update: {},
    create: { name: 'Mordor', description: 'The volcanic plateau ruled by Sauron.' },
  });

  const mirkwood = await prisma.habitat.upsert({
    where: { name: 'Mirkwood' },
    update: {},
    create: { name: 'Mirkwood', description: 'Dense, corrupted woodland.' },
  });

 // Inside your creature creation/upsert loop:
await prisma.creature.upsert({
  where: { name: 'Balrog' },
  update: {
    taxonomy: 'Maiar',
    behavior: 'Solitary, territorial, draws to light and sound',
    dangerRating: 4,
    threatLevel: 'Extreme',
    pageNumber: 1,
    totalPages: 16,
    figureCaption: 'Fig. 1 — The Balrog',
    imageUrl: '/images/balrog-plate.png',
    anatomicalSketches: [
      {
        title: 'Flame whip (detail)',
        imageUrl: '/images/flame-whip.png',
      },
      {
        title: 'Horn structure (front view)',
        imageUrl: '/images/horn-structure.png',
      },
    ],
  },
  create: {
    name: 'Balrog',
    originEra: 'FIRST_AGE',
    master: 'Morgoth',
    threatLevel: 'Extreme',
    description:
      'A fallen Maiar, the Balrog is a being of immense power, wreathed in shadow and flame. It is said to have once served Morgoth.',
    taxonomy: 'Maiar',
    behavior: 'Solitary, territorial, draws to light and sound',
    dangerRating: 4,
    pageNumber: 1,
    totalPages: 16,
    figureCaption: 'Fig. 1 — The Balrog',
    imageUrl: '/images/balrog-plate.png',
    anatomicalSketches: [
      {
        title: 'Flame whip (detail)',
        imageUrl: '/images/flame-whip.png',
      },
      {
        title: 'Horn structure (front view)',
        imageUrl: '/images/horn-structure.png',
      },
    ],
  },
});


  await prisma.creature.upsert({
    where: { name: 'Great Spider' },
    update: {},
    create: {
      name: 'Great Spider',
      originEra: Era.YEARS_OF_THE_TREES,
      master: null,
      threatLevel: 'Lethal',
      description: 'Enormous arachnid horrors descended from Ungoliant.',
      notables: {
        create: [
          { name: 'Shelob', title: 'Her Ladyship of Cirith Ungol', status: 'Unknown' },
        ],
      },
      habitats: {
        create: [
          { habitatId: mordor.id },
          { habitatId: mirkwood.id },
        ],
      },
    },
  });

  console.log('Seeding complete! 🧙‍♂️');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
