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
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
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

exports.receiveWebhook = (req, res) => {
  const entry = req.body.entry || [];
  entry.forEach(ent => {
    const changes = ent.changes || [];
    changes.forEach(change => {
      const statuses = change.value.statuses || [];
      statuses.forEach(status => {
        const { id: message_id, status: msg_status, timestamp, recipient_id } = status;

        db.query(
          'INSERT INTO message_logs (message_id, recipient_number, status, timestamp) VALUES (?, ?, ?, ?)',
          [message_id, recipient_id, msg_status, timestamp],
          (err) => {
            if (err) console.error('Insert error:', err);
          }
        );
      });
    });
  });

  res.sendStatus(200);
};
