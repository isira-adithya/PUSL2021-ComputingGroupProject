import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../../config';
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: config.MAILGUN_APIKEY});

mg.messages.create('mg.eventhive.live', {
	from: "Excited User <no-reply@eventhive.live>",
	to: ["yaxodo8283@darkse.com"],
	subject: "Hello",
	text: "Testing some Mailgun awesomeness!",
	html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
.then(msg => console.log(msg)) // logs response data
.catch(err => console.log(err)); // logs any error