import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ContactStrip = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-20 bg-gray-900 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600" />
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl lg:text-5xl font-bold mb-6"
                >
                  Ready to Start Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Project?
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-300 mb-8"
                >
                  Let's discuss your ideas and bring them to life with
                  cutting-edge technology and creative solutions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center text-gray-300">
                    <Mail size={20} className="text-blue-400 mr-4" />
                    <span>mail@pawansuthar.in</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone size={20} className="text-blue-400 mr-4" />
                    <span>+91 9784740736</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={20} className="text-blue-400 mr-4" />
                    <span>Ind Rajasthan Sangria</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Content - CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center lg:text-right"
              >
                <div className="space-y-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full font-medium text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                  >
                    <Send size={20} className="mr-3" />
                    Get In Touch
                  </Link>

                  <p className="text-gray-400 text-sm">
                    Usually responds within 24 hours
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      50+
                    </div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      3+
                    </div>
                    <div className="text-sm text-gray-400">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      99%
                    </div>
                    <div className="text-sm text-gray-400">Satisfied</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactStrip;
