import config from '../../config.js';
import PayPalRestSDK from 'paypal-rest-sdk';

PayPalRestSDK.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': config.PAYPAL_CI,
    'client_secret': config.PAYPAL_SK
})

async function getApprovalLink(amount, description, return_url, cancel_url) {
    return new Promise((resolve, reject) => {
        const formattedAmount = parseFloat(amount).toFixed(2);
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

async function executePayment(paymentId, payerId) {
    return new Promise((resolve, reject) => {
        const execute_payment_json = {
            "payer_id": payerId
        };

        PayPalRestSDK.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    });
}

export {
    getApprovalLink,
    executePayment
}