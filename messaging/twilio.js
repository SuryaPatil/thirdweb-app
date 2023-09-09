const twilio = require('twilio');

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

const client = twilio(accountSid, authToken);

async function sendMessages(phoneNumbers, message) {
  try {
    for (const phoneNumber of phoneNumbers) {
      await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });
    }
    console.log('Messages sent successfully');
  } catch (error) {
    console.error('Error sending messages:', error.message);
  }
}

module.exports = sendMessages;