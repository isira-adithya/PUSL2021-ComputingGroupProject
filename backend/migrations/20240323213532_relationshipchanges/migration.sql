-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `passwordresettoken` DROP FOREIGN KEY `PasswordResetToken_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticketpayment` DROP FOREIGN KEY `TicketPayment_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticketpayment` DROP FOREIGN KEY `TicketPayment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticketreceipt` DROP FOREIGN KEY `TicketReceipt_payment_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticketreceipt` DROP FOREIGN KEY `TicketReceipt_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticketreceipt` DROP FOREIGN KEY `TicketReceipt_user_id_fkey`;

-- AlterTable
ALTER TABLE `comment` MODIFY `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `ticketpayment` MODIFY `ticket_id` INTEGER NULL,
    MODIFY `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `ticketreceipt` MODIFY `payment_id` INTEGER NULL,
    MODIFY `ticket_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketPayment` ADD CONSTRAINT `TicketPayment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketPayment` ADD CONSTRAINT `TicketPayment_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `Ticket`(`ticket_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketReceipt` ADD CONSTRAINT `TicketReceipt_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketReceipt` ADD CONSTRAINT `TicketReceipt_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `TicketPayment`(`payment_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketReceipt` ADD CONSTRAINT `TicketReceipt_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `Ticket`(`ticket_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
