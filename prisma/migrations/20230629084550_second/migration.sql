/*
  Warnings:

  - You are about to alter the column `model` on the `drone` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `state` on the `drone` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to alter the column `state` on the `dronewelfarelog` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `drone` MODIFY `model` VARCHAR(191) NOT NULL,
    MODIFY `state` VARCHAR(191) NOT NULL DEFAULT 'IDLE';

-- AlterTable
ALTER TABLE `dronewelfarelog` MODIFY `state` VARCHAR(191) NOT NULL;
