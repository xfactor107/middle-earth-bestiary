-- An entry may come from no recorded age (e.g. the Mewlips of hobbit verse)
ALTER TABLE "creatures" ALTER COLUMN "originEra" DROP NOT NULL;
