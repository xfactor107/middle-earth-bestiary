// Writes the entries from bestiary.ts into the database (npm run seed).
// Note: local development and the live site share one database, so running
// this updates the live site too. It only upserts; it never deletes a creature.
import { PrismaClient } from '@prisma/client';
import { BESTIARY } from './bestiary.js';

const prisma = new PrismaClient();

// Idempotent: every run leaves the database matching bestiary.ts
async function main() {
  console.log('Seeding Middle-earth Bestiary data...');

  for (const { habitats, notables, ...fields } of BESTIARY) {
    const creature = await prisma.creature.upsert({
      where: { name: fields.name },
      update: fields,
      create: fields,
    });

    // Ensure each habitat exists, then replace this creature's links to them
    const habitatIds: number[] = [];
    for (const habitat of habitats) {
      const row = await prisma.habitat.upsert({
        where: { name: habitat.name },
        update: { description: habitat.description },
        create: habitat,
      });
      habitatIds.push(row.id);
    }
    await prisma.creatureHabitat.deleteMany({ where: { creatureId: creature.id } });
    await prisma.creatureHabitat.createMany({
      data: habitatIds.map((habitatId) => ({ creatureId: creature.id, habitatId })),
    });

    for (const notable of notables) {
      const data = { ...notable, creatureId: creature.id };
      await prisma.notableBeast.upsert({
        where: { name: notable.name },
        update: data,
        create: data,
      });
    }

    console.log(`  ✓ ${creature.name}`);
  }

  console.log(`Seeding complete! ${BESTIARY.length} entries 🧙‍♂️`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
