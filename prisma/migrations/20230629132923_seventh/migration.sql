/*
  Warnings:

  - Added the required column `weight` to the `Errands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `errands` ADD COLUMN `weight` INTEGER NOT NULL;
