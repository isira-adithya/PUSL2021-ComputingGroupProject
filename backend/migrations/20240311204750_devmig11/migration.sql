/*
  Warnings:

  - You are about to drop the `commentary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `commentary` DROP FOREIGN KEY `Commentary_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `commentary` DROP FOREIGN KEY `Commentary_user_id_fkey`;

-- DropTable
DROP TABLE `commentary`;
