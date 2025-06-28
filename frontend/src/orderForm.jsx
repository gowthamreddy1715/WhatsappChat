import { useState } from 'react';
import axios from 'axios';

export default function SendMessageForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('919390122293');
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://whatsappchat-mb7m.onrender.com/send-message', { name, phone, orderId });
      alert('Message sent!');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl mb-4 font-semibold">Send WhatsApp Message</h2>

      <label className="block mb-2">Name:</label>
      <input
        type="text"
        className="w-full p-2 border mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="block mb-2">Phone Number:</label>
      <select
        className="w-full p-2 border mb-4"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      >
        <option value="919390122293">919390122293</option>
        <option value="919014470781">919014470781</option>
      </select>

      <label className="block mb-2">Order ID:</label>
      <input
        type="text"
        className="w-full p-2 border mb-4"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Send Message
      </button>
    </form>
  );
}
