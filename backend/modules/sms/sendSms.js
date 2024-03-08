import config from "../../config.js";
import axios from "axios";

async function sendSms(to, message, contactFname = null, contactLname = null, contactEmail = null, contactAddress = null, contactGroup = null, type = null) {
    console.log(`Sending '${message}' to ${to}`);

    // In dev mode, API key is empty is if it is empty, sms should not be sent.
    if (config.NOTIFYLK_APIKEY.length() <= 0){
        return "Message Sent";
    }

    // Loading userId, APIkey and SenderID from config.js
    const url = 'https://app.notify.lk/api/v1/send';
    const params = {
        user_id: config.NOTIFYLK_USERID,
        api_key: config.NOTIFYLK_APIKEY,
        sender_id: config.NOTIFYLK_SENDERID,
        to,
        message,
        contact_fname: contactFname || '',
        contact_lname: contactLname || '',
        contact_email: contactEmail || '',
        contact_address: contactAddress || '',
        contact_group: contactGroup || '',
        type: type || ''
    };

    try {
        const response = await axios.get(url, { params });
        if (response.status == 200){
            return response.data
        } else {
            throw 'Internal Error - Notify API'
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {sendSms};