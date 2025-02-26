import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { SocialLinkData } = useSelector((state) => state?.DataStore);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4  z-50 fixed w-full text-white flex justify-between items-center bg-gradient-to-r from-[#242424] to-[#242424] shadow"
    >
      {/* Logo Animation */}
      <motion.a
        href="/"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="text-2xl cursor-pointer font-extrabold tracking-wide text-gray-200"
      >
        Portfolio
      </motion.a>

      {/* Navbar Items */}
      <ul className="flex gap-10 max-lg:hidden">
        <motion.li
          onClick={() => scrollToSection("home_section")}
          initial={{ y: 50, opacity: 0, color: "#242424" }}
          whileInView={{ y: 0, opacity: 1, color: "#fff" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="cursor-pointer font-bold hover:scale-105"
        >
          Home
        </motion.li>
        <motion.li
          onClick={() => scrollToSection("about_section")}
          initial={{ y: 50, opacity: 0, color: "#242424" }}
          animate={{ y: 0, opacity: 1, color: "#fff" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="cursor-pointer font-bold hover:scale-105"
        >
          About
        </motion.li>
        <motion.li
          onClick={() => scrollToSection("skills_section")}
          initial={{ y: 50, opacity: 0, color: "#242424" }}
          animate={{ y: 0, opacity: 1, color: "#fff" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="cursor-pointer font-bold hover:scale-105"
        >
          Skills
        </motion.li>
        <motion.li
          onClick={() => scrollToSection("project_section")}
          initial={{ y: 50, opacity: 0, color: "#242424" }}
          animate={{ y: 0, opacity: 1, color: "#fff" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="cursor-pointer font-bold hover:scale-105"
        >
          Projects
        </motion.li>
        <motion.li
          onClick={() => scrollToSection("education_section")}
          initial={{ y: 50, opacity: 0, color: "#242424" }}
          animate={{ y: 0, opacity: 1, color: "#fff" }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="cursor-pointer font-bold hover:scale-105"
        >
          Education
        </motion.li>
        <motion.li
          onClick={() => scrollToSection("contact_section")}
          initial={{ y: 50, opacity: 0, color: "#242424" }}
          animate={{ y: 0, opacity: 1, color: "#fff" }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="cursor-pointer font-bold hover:scale-105"
        >
          Contact
        </motion.li>
      </ul>

      {/* GitHub Button with Neon Glow */}
      <motion.a
        href={SocialLinkData[0]?.git}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        whileTap={{ scale: 0.9 }}
        className="border-2 px-4 py-2 text-sm hover:bg-[#00f7ff] hover:text-[#16213e] rounded-2xl border-[#00f7ff] text-[#00f7ff]  transition-all"
      >
        Github Profile
      </motion.a>
    </motion.nav>
  );
}
