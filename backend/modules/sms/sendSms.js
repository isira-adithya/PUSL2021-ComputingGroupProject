import config from "../../config.js";

async function sendSms(to, message, contactFname = null, contactLname = null, contactEmail = null, contactAddress = null, contactGroup = null, type = null) {
    console.log(`Sending ${msg} to ${to}`);

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
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {sendSms};