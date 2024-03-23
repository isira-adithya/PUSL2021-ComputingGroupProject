import express from "express";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {getApprovalLink, executePayment} from '../../../modules/paypal/payments.js';
import {sendEmail} from '../../../modules/emails/mailgun.js';
const prisma  = new PrismaClient();
const router = express.Router();

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateTicketReceiptInText(ticketReceipt, ticket, user){
    return `Event Name: ${ticket.event.name}\nEvent URL: https://eventhive.live/#/events/${ticket.event.uuid}\nTicket Code: ${ticketReceipt.ticket_code}\nTicket ID: ${ticketReceipt.ticket_id}\nCost: ${ticketReceipt.cost}\nPayment Method: ${ticketReceipt.payment_method}\nPayment ID: ${ticketReceipt.payment_id}\nUsername: ${user.user_name}\nFull name: ${user.first_name} ${user.last_name}\nEmail: ${user.email_address.email}`;
}

function generateTicketReceiptInHTML(ticketReceipt, ticket, user){
    return `<h3>Receipt</h3>
    <p><b>Event Name:</b> <a href="https://eventhive.live/#/events/${ticket.event.uuid}">${ticket.event.name}</a></p>
    <p><b>Ticket Code:</b> ${ticketReceipt.ticket_code}</p>
    <p><b>Ticket ID:</b> ${ticketReceipt.ticket_id}</p>
    <p><b>Cost:</b> ${ticketReceipt.cost}</p>
    <p><b>Payment Method:</b> ${ticketReceipt.payment_method}</p>
    <p><b>Payment ID:</b> ${ticketReceipt.payment_id}</p>
    <p><b>Username:</b> ${user.user_name}</p>
    <p><b>Fullname:</b> ${user.first_name} ${user.last_name}</p>
    <p><b>Email:</b> ${user.email_address.email}</p>
    `
    ;
}

async function sendReceiptEmail(paymentId, userId){
    const ticketReceipts = await prisma.ticketReceipt.findMany({
        where: {
            payment_id: paymentId
        }
    });
    const user = await prisma.user.findUnique({
        where: {
            user_id: userId
        },
        select: {
            first_name: true,
            last_name: true,
            user_name: true,
            email_address: {
                select: {
                    email: true
                }
            }
        }
    });
    const ticket = await prisma.ticket.findUnique({
        where: {
            ticket_id: ticketReceipts[0].ticket_id
        }, 
        select: {
            event_id: true,
            event: {
                select: {
                    name: true,
                    uuid: true
                }
            }
        }
    });
    for (let ticketReceipt of ticketReceipts){
        // Send email
        const textPart = generateTicketReceiptInText(ticketReceipt, ticket, user);
        const htmlPart = generateTicketReceiptInHTML(ticketReceipt, ticket, user);
        await sendEmail([user.email_address.email], 'Ticket Receipt', textPart, htmlPart);
    }
}

router.get('/success', async (req, res) => {
    // paymentId, token, PayerID must be available
    if (!req.query.payment_id || !req.query.paymentId || !req.query.token || !req.query.PayerID) {
        res.send('Payment failed');
    }

    const payment_id = parseInt(req.query.payment_id);
    const paymentId = req.query.paymentId;
    const token = req.query.token;
    const PayerID = req.query.PayerID;

    try {
        const payment = await executePayment(paymentId, PayerID);
        if (payment['state'] == 'approved'){
            const paymentRecord = await prisma.ticketPayment.findUnique({
                where: {
                    payment_id: payment_id
                }
            });
            if (paymentRecord == null){
                res.status(404);
                res.contentType('text/html');
                return res.send(`<p>Payment not found.</p>`);
            }
            await prisma.ticketPayment.update({
                where: {
                    payment_id: payment_id
                },
                data: {
                    status: 'PAID'
                }
            });

            // Generate 8 letter all capital string
            const ticketCode = generateRandomString();

            for (let i = 0; i < paymentRecord.ticket_quantity; i++){
                await prisma.ticketReceipt.create({
                    data: {
                        ticket_code: ticketCode,
                        ticket_id: paymentRecord.ticket_id,
                        cost: paymentRecord.amount / paymentRecord.ticket_quantity,
                        payment_method: 'PAYPAL',
                        payment_id: payment_id,
                        user_id: paymentRecord.user_id
                    }
                });
            }

            // TODO: send a receipt email
            sendReceiptEmail(payment_id, paymentRecord.user_id);
        } else {
            res.status(500);
            res.contentType('text/html');
            return res.send(`<p>Payment failed. Please try again later.</p>`);
        }
    } catch (error) {
        console.log(error)
        res.status(500);
        res.contentType('text/html');
        // Redirect in 5 seconds
        if (Object.keys(error).includes('response')) {
            return res.send(`<p>Something went wrong, please refresh this page.</p><b>Error:</b><pre><code>${error['response']['message']}</code></pre>`);
        } else {
            return res.send(`<p>Something went wrong, please refresh this page.</p><script>window.setTimeout(()=>{window.location.href = window.location.href + \'&retry\'},5000)</script>`);
        }
        
    }

    res.send('Payment successful');
});

router.get('/cancel', (req, res) => {
    return res.redirect('/#/events/');
});

export default router;