import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUp, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Subscribe } from "../../src/Redux/Slice/UserSlice";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // success | error | loading | ""
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "contact" },
  ];

  const services = [
    "Full Stack Development",
    "UI/UX Design",
    "API Integration",
    "Admin Panels",
    "E-commerce Solutions",
    "Custom Web Apps",
  ];
  const handleSubscribe = async () => {
    // Reset feedback
    setStatus("");
    setMessage("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("loading");

      const res = await dispatch(Subscribe(email));
      if (res?.payload?.success) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
      } else {
        setStatus("error");
        setMessage(
          res?.payload?.message || "Something went wrong. Please try again."
        );
      }
      // Simulate async API call (replace this with your actual API)
      setEmail(""); // Clear input
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-gray-950 border-t border-white/10 relative">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Pawan Kumar
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Full-stack developer passionate about creating exceptional digital
              experiences. Let's build something amazing together.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span> Pawan Kumar Made with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>and lots of coffee</span>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <span
                    onClick={() => navigate(link.href)}
                    className="text-gray-400 hover:text-primary-500 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl font-semibold text-white"
            >
              Get In Touch
            </motion.h4>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-blue-400" />
                <a
                  href="mailto:hello@pawankumar.dev"
                  className="hover:text-white transition-colors duration-200"
                >
                  hello@pawankumar.dev
                </a>
              </div>

              <div className="text-gray-400">
                <p className="leading-relaxed">
                  Currently available for freelance projects and full-time
                  opportunities.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-2 text-emerald-400"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">
                  Available for new projects
                </span>
              </motion.div>
            </motion.div>
          </div>
          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <span className="text-gray-400">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-12 pt-12 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4 gradient-text">
              Stay Updated
            </h4>
            <p className="text-gray-400 mb-6">
              Subscribe to get notified about my latest projects and tech
              insights.
            </p>

            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
              />
              <button
                onClick={handleSubscribe}
                disabled={status === "loading"}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium glow-button cursor-pointer disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {message && (
              <p
                className={`mt-4 text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : ""
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Pawan Kumar. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-3 glass rounded-full hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <ArrowUp size={20} className="group-hover:animate-bounce" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
