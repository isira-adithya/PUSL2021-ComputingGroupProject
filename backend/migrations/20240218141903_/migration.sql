/*
  Warnings:

  - You are about to drop the column `is_visible` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `is_visible`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD COLUMN `visibility` VARCHAR(191) NOT NULL DEFAULT 'private';

-- CreateIndex
CREATE UNIQUE INDEX `Event_uuid_key` ON `Event`(`uuid`);
