/*
  Warnings:

  - Added the required column `sent_at` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `sent_at` DATETIME(3) NOT NULL;
