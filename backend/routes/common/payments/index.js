import express from "express";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {getApprovalLink, executePayment} from '../../../modules/paypal/payments.js';
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

            await prisma.ticketReceipt.create({
                data: {
                    ticket_code: ticketCode,
                    ticket_id: paymentRecord.ticket_id,
                    cost: paymentRecord.amount,
                    payment_method: 'PAYPAL',
                    payment_id: payment_id,
                    user_id: paymentRecord.user_id
                }
            });

            // TODO: send a receipt email
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