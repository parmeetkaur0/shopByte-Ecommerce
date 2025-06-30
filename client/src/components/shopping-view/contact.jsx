import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_37zmdwc',
        'template_ph30yrv',
        formData,
        '-xTHW38pU9dR9sGe2'
      )
      .then(() => {
        alert('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Email send error:', error);
        alert('❌ Failed to send message.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 border-t-4 border-gray-800">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Have a question or feedback? We’d love to hear from you!
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-800"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-800"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-800"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-gray-800 hover:gray-500 rounded-lg font-semibold transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
