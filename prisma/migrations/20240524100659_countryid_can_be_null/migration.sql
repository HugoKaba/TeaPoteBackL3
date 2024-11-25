-- DropForeignKey
ALTER TABLE `Tea` DROP FOREIGN KEY `Tea_countryId_fkey`;

-- AlterTable
ALTER TABLE `Tea` MODIFY `countryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Tea` ADD CONSTRAINT `Tea_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
