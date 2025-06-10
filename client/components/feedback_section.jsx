import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Feedback = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      text: "Pawan delivered an exceptional e-commerce platform that exceeded our expectations. The dashboard is intuitive, the code is clean, and the performance is outstanding. Highly recommended!",
      project: "E-commerce Platform",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, DataFlow Solutions",
      avatar:
        "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      text: "Working with Pawan was a game-changer for our startup. He built a sophisticated analytics dashboard that our clients love. His attention to detail and technical expertise are remarkable.",
      project: "Analytics Dashboard",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "CTO, InnovateLab",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      text: "The AI-powered content generation tool Pawan developed has revolutionized our content strategy. The integration was seamless, and the results speak for themselves.",
      project: "AI Content Tool",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Product Manager, CloudSync",
      avatar:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      text: "Pawan's expertise in full-stack development is evident in every project. He delivered a robust API solution that handles our scale perfectly. Communication was excellent throughout.",
      project: "API Development",
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Marketing Director, GrowthCo",
      avatar:
        "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      text: "The social media management platform Pawan built has streamlined our entire workflow. The UI is beautiful, functionality is comprehensive, and it's incredibly user-friendly.",
      project: "Social Media Platform",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <section
      id="feedback"
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients say about
            working with me.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-yellow-400/20">
                  <Quote size={48} />
                </div>

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    <div className="flex gap-1">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed text-center mb-8">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div className="text-center md:text-left">
                      <h4 className="text-white font-semibold text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-400">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-yellow-400 text-sm font-medium">
                        {testimonials[currentIndex].project}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-3xl" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full text-white hover:border-gray-600/50 transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </motion.button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full text-white hover:border-gray-600/50 transition-all duration-300"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-yellow-400 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Previews */}
          <div className="hidden md:flex justify-center gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gray-700/50 border border-yellow-400/30"
                    : "bg-gray-800/30 border border-gray-700/30 hover:bg-gray-700/30"
                }`}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-white text-sm font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-400 text-xs">{testimonial.project}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300"
          >
            Join My Happy Clients
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feedback;
