import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import ContactImage from "../src/assets/Contect_logo.png"; // Replace with actual image

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    console.log(formData);
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section>
      {/* Left Side - Image */}
      <div className="flex justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 10 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[#00f7ff]   gap-1 flex text-xl justify-center  items-center font-bold w-42 text-center px-2"
        >
          Contact
          <samp className="bg-[#00f7ff] mt-2 w-6 h-[2px]  rounded"></samp>
        </motion.h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center  px-6 py-12 md:gap-10">
        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={ContactImage}
            alt="Contact"
            className="min-w-[100%] hidden md:flex  object-cover object-center rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2  shadow-lg p-8 rounded-xl">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex  gap-5">
              <motion.input
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                aria-label="Your Name"
                className="p-3 border-b w-[48%]  border-white   text-[#00f7ff] outline-0"
                required
              />

              <motion.input
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                aria-label="Your Email"
                className="p-3 border-b w-[48%]   border-white   text-[#00f7ff] outline-0"
                required
              />
            </div>

            <motion.input
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              aria-label="Subject"
              className="p-3 border-b   border-white   text-[#00f7ff]   outline-0"
              required
            />

            <motion.textarea
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              aria-label="Your Message"
              rows="4"
              className="p-3 border-b border-white   text-[#00f7ff] outline-0"
              required
            ></motion.textarea>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              type="submit"
              className="bg-[#00f7ff] cursor-pointer  text-gray-800 font-bold font-serif px-5 py-3 rounded-xl  transition shadow-lg w-full"
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </form>

          {/* Social Media Links */}
          <div className="flex justify-center gap-5 mt-6">
            <motion.a
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
              whileHover={{ scale: 1.2 }}
            >
              <FaFacebookF size={24} />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              href="#"
              className="text-red-500 dark:text-red-400 hover:text-red-700"
              whileHover={{ scale: 1.2 }}
            >
              <FaInstagram size={24} />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              href="#"
              className="text-gray-800 dark:text-gray-300 hover:text-gray-600"
              whileHover={{ scale: 1.2 }}
            >
              <FaXTwitter size={24} />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              href="#"
              className="text-blue-500 dark:text-blue-300 hover:text-blue-700"
              whileHover={{ scale: 1.2 }}
            >
              <FaLinkedinIn size={24} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
