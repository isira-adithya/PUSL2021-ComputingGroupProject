import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../../config.js';
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: config.MAILGUN_APIKEY});


// Create a function to send emails
async function sendEmail(to, subject, text, html) {
    try {
        const mgResponse = await mg.messages.create('mg.eventhive.live', {
            from: "EventHive <no-reply@eventhive.live>",
            to: to,
            subject: subject,
            text: text,
            html: html
        });
        if (mgResponse.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        console.log(e)
        return false;
    }
}

export {
    sendEmail
};