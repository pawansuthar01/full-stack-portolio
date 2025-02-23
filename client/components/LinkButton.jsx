import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
export const LinkButton = () => {
  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, scale: 0, y: -20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h4>Follow Us:</h4>
      <ul className="flex gap-2 mt-1 mb-5 ">
        <li className="border-1 p-1 rounded cursor-pointer hover:bg-green-400">
          <FaFacebookF size={20} />
        </li>
        <li className="border-1 p-1 rounded cursor-pointer hover:bg-red-500">
          <FaInstagram size={20} />
        </li>
        <li className="border-1 p-1 rounded cursor-pointer hover:bg-black/60">
          <FaXTwitter size={20} />
        </li>
        <li className="border-1 p-1 rounded cursor-pointer hover:bg-blue-500">
          <FaLinkedinIn size={20} />
        </li>
      </ul>
    </motion.div>
  );
};

export const ContactLinkButton = ({ ShowAnimation }) => {
  return (
    <div className="flex justify-center gap-5 mt-6">
      <motion.a
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0, delay: 0.4, ease: "easeOut" }}
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
  );
};
