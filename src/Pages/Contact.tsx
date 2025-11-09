import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const SERVICE_ID = "service_4moz0ad";
const TEMPLATE_ID = "template_8ca0in7";
const PUBLIC_KEY = "qUNqhVs-rShUhsRIc";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMail = async (e: any) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          time: new Date().toLocaleString(),
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-3xl"
      >
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold text-center mb-4 text-indigo-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Me
        </motion.h1>

        <p className="text-center text-gray-600 mb-10">
          Feel free to reach out! I’d love to connect and collaborate 🚀
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-10">
          <div>
            <MailOutlined className="text-indigo-600 text-3xl mb-2" />
            <p className="font-semibold">Email</p>
            <span className="text-gray-600">sanjayrajan053@gmail.com</span>
          </div>

          <div>
            <PhoneOutlined className="text-green-600 text-3xl mb-2" />
            <p className="font-semibold">Phone</p>
            <span className="text-gray-600">+91 93847 74613</span>
          </div>

          <div>
            <EnvironmentOutlined className="text-red-500 text-3xl mb-2" />
            <p className="font-semibold">Hyderabad</p>
            <span className="text-gray-600">India</span>
          </div>
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={sendMail}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg min-h-[140px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ></textarea>

          <motion.button
            whileHover={{ scale: status === "sending" ? 1 : 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={status === "sending"}
            className={`w-full text-white font-semibold py-3 rounded-lg transition
              ${
                status === "sending"
                  ? "bg-gray-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>

        {/* Feedback */}
        {status === "success" && (
          <p className="text-green-600 text-center mt-4">
            ✅ Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-4">
            ❌ Something went wrong. Try again.
          </p>
        )}

        {/* Social */}
        <div className="flex justify-center gap-6 mt-10">
          <motion.a
            href="https://github.com/Sanjay053"
            target="_blank"
            whileHover={{ scale: 1.2 }}
          >
            <GithubOutlined className="text-2xl text-gray-700 hover:text-black" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/sanjayrajan053"
            target="_blank"
            whileHover={{ scale: 1.2 }}
          >
            <LinkedinOutlined className="text-2xl text-indigo-600 hover:text-indigo-800" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
