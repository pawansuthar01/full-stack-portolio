import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Banner_section() {
  const { bannerData } = useSelector((state) => state?.DataStore);
  const { SocialLinkData } = useSelector((state) => state?.DataStore);

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const titles = bannerData[0]?.titles || [
    "Full-Stack Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];

    if (displayText.length < currentTitle.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex((prev) => (prev + 1) % titles.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [displayText, currentIndex, titles]);

  return (
    <section className="min-h-screen   pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [null, -100],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            className="text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {bannerData[0]?.title || "HI, i`am"}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {bannerData[0]?.name || "pawan kumar"}
            </span>
          </motion.h1>

          <motion.div
            className="text-2xl lg:text-3xl text-gray-300 mb-8 h-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-blue-400"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          <motion.p
            className="text-lg text-gray-400 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {bannerData[0]?.description ||
              ` I craft digital experiences that combine beautiful design with
            powerful functionality. Specializing in modern web technologies and
            creating solutions that make a difference.`}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
              to="/projects"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 text-center"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="border border-white/20 hover:border-white/40 px-8 py-3 rounded-full font-medium transition-all duration-200 hover:bg-white/5 text-center"
            >
              Get In Touch
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center justify-center lg:justify-start space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a
              href={SocialLinkData[0]?.GitHub}
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <Github size={24} />
            </a>
            <a
              href={SocialLinkData[0]?.LinkedIn}
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:mail@pawansuthar.in"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <Mail size={24} />
            </a>
            <a
              href={SocialLinkData[0]?.CV}
              target="_blank"
              className="flex items-center text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <Download size={20} className="mr-2" />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Avatar/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative w-80 h-80 mx-auto sm:mb-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl" />
            <div className="relative w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <img
                className="w-76 h-76 object-cover rounded-full"
                src={bannerData[0]?.photo}
              />
            </div>

            {/* Floating Elements */}
            {[
              { icon: "⚛️", position: "top-0 right-8", delay: 0 },
              { icon: "🚀", position: "top-8 left-0", delay: 0.5 },
              { icon: "💡", position: "bottom-8 right-0", delay: 1 },
              { icon: "🎨", position: "bottom-0 left-8", delay: 1.5 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`absolute ${item.position} text-2xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  delay: item.delay,
                  duration: 0.8,
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 cursor-pointer"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
