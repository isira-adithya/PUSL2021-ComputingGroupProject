/*
  Warnings:

  - Added the required column `cost` to the `TicketReceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `TicketReceipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticketreceipt` ADD COLUMN `cost` INTEGER NOT NULL,
    ADD COLUMN `payment_method` VARCHAR(191) NOT NULL;
