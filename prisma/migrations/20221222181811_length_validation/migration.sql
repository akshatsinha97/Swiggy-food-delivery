/*
  Warnings:

  - You are about to alter the column `name` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to drop the column `cartId` on the `food` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `food` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `image` on the `food` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `lastname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - Made the column `firstname` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `Food_cartId_fkey`;

-- AlterTable
ALTER TABLE `category` MODIFY `name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `food` DROP COLUMN `cartId`,
    MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `description` VARCHAR(255) NULL,
    MODIFY `image` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `firstname` VARCHAR(50) NOT NULL,
    MODIFY `lastname` VARCHAR(50) NULL,
    MODIFY `password` VARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE `_CartToFood` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartToFood_AB_unique`(`A`, `B`),
    INDEX `_CartToFood_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CartToFood` ADD CONSTRAINT `_CartToFood_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartToFood` ADD CONSTRAINT `_CartToFood_B_fkey` FOREIGN KEY (`B`) REFERENCES `Food`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
