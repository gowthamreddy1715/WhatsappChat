const axios = require("axios");
const db = require("../db");

// Send Message and save to DB
exports.sendMessage = async (req, res) => {
  const { name, phone, orderId } = req.body;
  const userId = req.user.id;

  const message = `Hello ${name}, your order #${orderId} is ready! 📦`;

  db.query(
    "INSERT INTO orders (customerName, phoneNumber, orderId, user_id) VALUES (?, ?, ?, ?)",
    [name, phone, orderId, userId],
    async (err) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).json({ message: "Database Insert Failed" });
      }

      // Uncomment if you want to send WhatsApp message
      // try {
      //   await axios.post(
      //     `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      //     {
      //       messaging_product: "whatsapp",
      //       to: phone,
      //       type: "template",
      //       template: {
      //         name: "hello_world",
      //         language: { code: "en_US" },
      //       },
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      // } catch (error) {
      //   console.error(" WhatsApp Error:", error.response?.data || error.message);
      //   return res.status(500).json({ message: "Failed to send WhatsApp message" });
      // }

      return res.status(200).json({
        message: "Message stored successfully",
        orderDetails: { name, phone, orderId, userId },
      });
    }
  );
};

exports.viewMessage = (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT * FROM orders WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json({ orders: results });
  });
};
