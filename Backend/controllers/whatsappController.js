const axios = require('axios');
const db = require('../db');

exports.sendMessage = async (req, res) => {
  const { name, phone, orderId } = req.body;
  const message = `Hello ${name}, your order #${orderId} is ready! 📦`;

  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'template',
            template: {
                name: 'hello_world',
                language: { code: 'en_US' },
              }              
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    db.query(
      'INSERT INTO orders (customerName,phoneNumber,orderId) VALUES (?, ?, ?)',
      [name,phone,orderId],
      (err) => {
        if (err) console.error('Insert error:', err);
      }
    );
    
    res.status(200).send('Message sent');
   

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Failed to send message');
  }
};


exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
};

