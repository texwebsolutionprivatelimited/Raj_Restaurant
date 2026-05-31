"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Get in Touch</h1>
            <p className="text-gray-400">
              We&apos;d love to hear from you. Contact us anytime!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-white">
                Contact Information
              </h2>

              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+91-9999-999-999",
                  subtext: "Available 10 AM - 11 PM daily",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "support@rajrestaurant.com",
                  subtext: "We reply within 24 hours",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "Mp Nagar Zone 1",
                  subtext: "Bhopal Madhya Pradesh, India - 462011",
                },
                {
                  icon: Clock,
                  title: "Operating Hours",
                  content: "Mon - Sun: 12 PM - 11:30 PM",
                  subtext: "Closed on major holidays",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg p-6 hover:border-red-600/50 transition"
                >
                  <div className="flex gap-4">
                    <item.icon className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white font-semibold">{item.content}</p>
                      <p className="text-gray-400 text-sm">{item.subtext}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg p-8 space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">
                  Send us a Message
                </h2>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9999999999"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-red-600/50 transition"
                >
                  Send Message
                </motion.button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/30 border border-green-600 rounded-lg p-4 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-green-400">
                      Message sent! We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "What are your delivery timings?",
                  a: "We deliver from 11 AM to 11:30 PM daily. Standard delivery takes 20-40 minutes.",
                },
                {
                  q: "Do you accept reservations for large groups?",
                  a: "Yes! We accept group bookings of 10+ guests with special rates. Contact us for details.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit/debit cards and digital payments through Razorpay.",
                },
                {
                  q: "Are there any allergen warnings?",
                  a: "Please specify any allergies during checkout. Contact us for detailed allergen information.",
                },
                {
                  q: "Can I customize my order?",
                  a: "Yes! You can customize most dishes. Special instructions can be added during checkout.",
                },
                {
                  q: "What if I have a complaint about my order?",
                  a: "Contact our support team immediately at +91-9999-999-999. We&apos;ll resolve it quickly.",
                },
              ].map((faq, i) => (
                <motion.div key={i} className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
