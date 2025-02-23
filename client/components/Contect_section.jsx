import { useState } from "react";
import { motion } from "framer-motion";

import ContactImage from "../src/assets/Contect_logo.png"; // Replace with actual image
import { ContactLinkButton } from "./LinkButton";
import { isEmail } from "../Helper/Regex";
import { useDispatch } from "react-redux";
import { submitMessage } from "../src/Redux/Slice/UserSlice";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setMessage(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    document.getElementById(e.target.name).style.borderColor = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      document.getElementById("fullName").style.borderColor = "red";
      return;
    }
    if (!formData.email) {
      document.getElementById("email").style.borderColor = "red";
      return;
    }
    if (!isEmail(formData.email)) {
      document.getElementById("email").style.borderColor = "red";
      return;
    }
    if (!formData.subject) {
      document.getElementById("subject").style.borderColor = "red";
      return;
    }
    if (!formData.message) {
      document.getElementById("message").style.borderColor = "red";
      return;
    }
    const res = await dispatch(submitMessage(formData));

    setMessage(res?.payload?.message);

    setFormData({ fullName: "", email: "", subject: "", message: "" });
  };

  return (
    <section>
      {/* Left Side - Image */}
      <div className="flex justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <img
            src={ContactImage}
            alt="Contact"
            className="w-[90%] hidden md:flex  h-[460px]  object-contain object-center "
          />
        </motion.div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2  shadow-lg p-8 rounded-xl">
          <form
            noValidate
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <div className="flex  gap-5">
              <motion.input
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your fullName"
                aria-label="Your fullName"
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
                id="email"
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
              id="subject"
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
              id="message"
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
              disabled={message}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              type="submit"
              className="bg-[#00f7ff] cursor-pointer  text-gray-800 font-bold font-serif px-5 py-3 rounded-xl  transition shadow-lg w-full"
              whileHover={{ scale: 1.05 }}
            >
              {message ? message : "Send Message"}
            </motion.button>
          </form>

          {/* Social Media Links */}
          <ContactLinkButton />
        </div>
      </div>
    </section>
  );
}
