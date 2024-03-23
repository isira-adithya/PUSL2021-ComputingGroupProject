import config from '../../config.js';
import PayPalRestSDK from 'paypal-rest-sdk';

PayPalRestSDK.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': config.PAYPAL_CI,
    'client_secret': config.PAYPAL_SK
})

async function getApprovalLink(amount, description, return_url, cancel_url) {
    return new Promise((resolve, reject) => {
        const formattedAmount = parseFloat(amount.replace(/[^0-9.-]+/g, "")).toFixed(2);
        const payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": formattedAmount,
                    "currency": "USD"
                },
                "description": description
            }],
            "redirect_urls": {
                "return_url": return_url,
                "cancel_url": cancel_url
            }
        };

        PayPalRestSDK.payment.create(payment, function (error, payment) {
            if (error) {
                reject(error);
            } else {
                resolve(payment.links[1].href);
            }
        });
    });
}

export {
    getApprovalLink
}