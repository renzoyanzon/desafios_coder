const twilio = require('twilio');
require('dotenv').config()

const {loggerDev, loggerProd} = require('../logger/index');
const logger = process.env.ENVIRONMENT == "development" 
    ? loggerDev
    : loggerProd


const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

async function sendWhatsapp (msg){
    try {
        const message = await client.messages
        .create({
            body: msg,
            from: '+15075193767',
            to: '+542617085942'
        })

        logger.info(message.sid)

    } catch (err) {
        logger.err(err);
    }
    
  

}

/* const sendWhatsapp = async ( msg) => {
    client.messages
    .create({
        body: msg,
        from: '+15075193767',
        to: '+542617085942'
    })
    .then(message => logger.info(message.sid))
    .done();
} */

module.exports = sendWhatsapp;