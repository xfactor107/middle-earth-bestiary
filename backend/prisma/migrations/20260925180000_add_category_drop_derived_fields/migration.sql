-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MAIAR', 'ORCS', 'TROLLS', 'BEASTS', 'DRAGONS', 'ENTS', 'BIRDS');

-- Add category, backfilling existing rows before making it required
ALTER TABLE "creatures" ADD COLUMN "category" "Category" NOT NULL DEFAULT 'BEASTS';
UPDATE "creatures" SET "category" = 'MAIAR' WHERE "name" = 'Balrog';
ALTER TABLE "creatures" ALTER COLUMN "category" DROP DEFAULT;

-- Drop fields the frontend now derives: page numbers from codex order,
-- threat label from dangerRating
ALTER TABLE "creatures" DROP COLUMN "pageNumber",
DROP COLUMN "totalPages",
DROP COLUMN "threatLevel";
