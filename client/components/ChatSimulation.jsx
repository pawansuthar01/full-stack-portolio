import { MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
export const ChatSimulation = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [messages, setMessage] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const conversationFlow = [
    {
      text: "Hi! I need a modern website for my business. Can you help?",
      sender: "client",
    },
    {
      text: "Absolutely! I'd love to help you create something amazing. What kind of business is it?",
      sender: "me",
    },
    {
      text: "It's a tech startup. We need something clean, fast, and professional.",
      sender: "client",
    },
    {
      text: "Perfect! I specialize in modern, responsive designs with great performance. Let me show you some examples.",
      sender: "me",
    },
    {
      text: "That sounds exactly what we need! How long would it take?",
      sender: "client",
    },
    {
      text: "For a complete solution, typically 2-3 weeks. I'll handle everything from design to deployment.",
      sender: "me",
    },
  ];
  useEffect(() => {
    if (!inView || currentIndex >= conversationFlow.length) return;
    const timer = setTimeout(
      () => {
        if (conversationFlow.length > currentIndex) {
          setIsTyping(true);
          setTimeout(() => {
            const newMessage = {
              id: currentIndex,
              message: conversationFlow[currentIndex].text,
              sender: conversationFlow[currentIndex].sender,
              timestamp: new Date().toLocaleDateString("es-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
            setMessage((prev) => [...prev, newMessage]);
            setIsTyping(false);
            setCurrentIndex((prev) => prev + 1);
          }, 1500);
        }
      },
      currentIndex == 0 ? 1000 : 2000
    );
    return () => clearTimeout(timer);
  }, [inView, currentIndex, conversationFlow.length]);
  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Talk
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how our conversation might look like
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-4 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Pawan Kumar</h3>
                <p className="text-sm text-green-400">● Online</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
                      : "bg-white/10 text-white rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "me"
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">
                      typing...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Start a conversation..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                disabled
              />
              <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors">
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 mb-4">Ready to start your project?</p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};
