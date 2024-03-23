-- CreateTable
CREATE TABLE `TicketReceipt` (
    `receipt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `ticket_id` INTEGER NOT NULL,
    `ticket_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`receipt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketReceipt` ADD CONSTRAINT `TicketReceipt_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketReceipt` ADD CONSTRAINT `TicketReceipt_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `TicketPayment`(`payment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketReceipt` ADD CONSTRAINT `TicketReceipt_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `Ticket`(`ticket_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
