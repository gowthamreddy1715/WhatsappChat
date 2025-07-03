import { useState } from 'react';
import axios from 'axios';
import ViewOrders from './viewOrders';

export default function SendMessageForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('919014470781');
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token"); 

  try {
    await axios.post(
      'http://localhost:5000/send',
      { name, phone, orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    alert('Message sent successfully');
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert('Failed to send message');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ece5dd] px-4">
      <div className="w-full max-w-md bg-[#ffffff] rounded-lg overflow-hidden shadow-md border border-gray-200">
        <div className="bg-[#075e54] text-white text-center py-4 text-xl font-semibold">
          WhatsApp Notification
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-[#ffffff]">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-full bg-[#f0f0f0] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25d366]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <select
              className="w-full px-4 py-2 rounded-full bg-[#f0f0f0] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25d366]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              <option value="919390122293">919390122293</option>
              <option value="919014470781">919014470781</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-full bg-[#f0f0f0] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#25d366]"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter order ID"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#25d366] text-white font-medium py-2 rounded-full hover:bg-[#128c7e] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <ViewOrders />
      
    </div>
    
  );
}
