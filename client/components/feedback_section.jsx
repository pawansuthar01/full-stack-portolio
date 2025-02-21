import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const feedbacksData = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    rating: 5,
    message: "Great experience!",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    rating: 4,
    message: "Loved the design!",
  },
  {
    id: "3",
    name: "Mike Lee",
    email: "mike@example.com",
    rating: 5,
    message: "Amazing work!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
  {
    id: "4",
    name: "Emma Watson",
    email: "emma@example.com",
    rating: 3,
    message:
      "Nice website! Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!Nice website!",
  },
];

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState(feedbacksData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbacks([...feedbacks, { id: Date.now().toString(), ...formData }]);
    setFormData({ name: "", email: "", rating: 0, message: "" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center  text-white px-6 md:py-12">
      <div className="flex justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 10 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[#00f7ff] mb-6  gap-1 flex text-xl justify-center  items-center font-bold w-42 text-center px-2"
        >
          Feedback
          <samp className="bg-[#00f7ff] mt-2 w-6 h-[2px]  rounded"></samp>
        </motion.h1>
      </div>
      {/* Feedback Form */}
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className=" p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-3 w-1/2 border-1 border-[#00f7ff] rounded-lg focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="p-3 w-1/2 border-1 border-[#00f7ff] rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Rating:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer ${
                  formData.rating >= star ? "text-yellow-400" : "text-gray-500"
                }`}
                onClick={() => setFormData({ ...formData, rating: star })}
              />
            ))}
          </div>
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="p-3 w-full border-1 border-[#00f7ff] rounded-lg focus:outline-none mb-4"
          rows="4"
        ></textarea>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg w-full"
        >
          Submit Feedback
        </button>
      </motion.form>

      <div className="mt-10 w-full overflow-hidden relative">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",

            duration: 12,
            repeat: Infinity,
          }}
        >
          {[...feedbacks, ...feedbacks].map((feedback, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-opacity-40  p-4 items-stretch h-full border-cyan-400 backdrop-blur-lg border-1   rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold text-cyan-400">
                {feedback.name}
              </h3>
              <p className="text-sm text-gray-400">{feedback.email}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    className={
                      i < feedback.rating ? "text-yellow-400" : "text-gray-500"
                    }
                  />
                ))}
              </div>
              <p className="mt-3">{feedback.message}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
