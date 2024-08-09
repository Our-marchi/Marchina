'use client';

import React, { useState, FormEvent } from "react";
import { FaPhone, FaEnvelope } from 'react-icons/fa';

interface ContactFormState {
  name: string;
  recipient_email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    recipient_email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const sendMail = async (e: FormEvent) => {
    e.preventDefault();
    const { name, recipient_email, phone, message } = formState;
    if (name && recipient_email && phone && message) {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:5000/send_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            recipient_email,
            phone,
            message,
          }),
        });

        if (response.ok) {
          alert("Message Sent Successfully");
        } else {
          alert("Failed to send message");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to send message");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="bg-red-500 rounded-full p-2 mr-3">
                <FaPhone className="text-white" />
              </div>
              <h2 className="text-lg font-semibold">Call To Us</h2>
            </div>
            <p className="text-sm text-gray-600 ml-11">We are available 24/7, 7 days a week.</p>
            <p className="text-sm text-gray-800 ml-11 font-semibold">Phone: +8801611112222</p>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <div className="bg-red-500 rounded-full p-2 mr-3">
                <FaEnvelope className="text-white" />
              </div>
              <h2 className="text-lg font-semibold">Write To Us</h2>
            </div>
            <p className="text-sm text-gray-600 ml-11">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-sm text-gray-800 ml-11 font-semibold">Emails: customer@exclusive.com</p>
            <p className="text-sm text-gray-800 ml-11 font-semibold">support@exclusive.com</p>
          </div>
        </div>

        <div className="md:w-2/3">
          <form onSubmit={sendMail} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className="col-span-1 p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="recipient_email"
                value={formState.recipient_email}
                onChange={handleChange}
                placeholder="Your Email *"
                className="col-span-1 p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder="Your Phone *"
                className="col-span-1 p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded h-40 resize-none"
              required
            ></textarea>
            <div className="text-right">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}