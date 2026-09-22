-- AlterTable
ALTER TABLE "creatures" ADD COLUMN     "anatomicalSketches" JSONB DEFAULT '[]',
ADD COLUMN     "behavior" TEXT,
ADD COLUMN     "dangerRating" INTEGER DEFAULT 1,
ADD COLUMN     "figureCaption" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "pageNumber" INTEGER,
ADD COLUMN     "taxonomy" TEXT,
ADD COLUMN     "totalPages" INTEGER NOT NULL DEFAULT 16;
