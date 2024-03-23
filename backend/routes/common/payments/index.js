import express from "express";
import {
    PrismaClient
} from '../../../modules/prisma_client/index.js';
import {getApprovalLink, executePayment} from '../../../modules/paypal/payments.js';
const prisma  = new PrismaClient();
const router = express.Router();

router.get('/success', async (req, res) => {
    // paymentId, token, PayerID must be available
    if (!req.query.paymentId || !req.query.token || !req.query.PayerID) {
        res.send('Payment failed');
    }

    const paymentId = req.query.paymentId;
    const token = req.query.token;
    const PayerID = req.query.PayerID;

    try {
        const payment = await executePayment(paymentId, PayerID);
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

export default router;