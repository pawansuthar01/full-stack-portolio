import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "../Helper/Regex";
import { submitFeedback } from "../src/Redux/Slice/UserSlice";

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const { feedbackData } = useSelector((state) => state?.DataStore);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const [feedbacks, setFeedbacks] = useState(feedbackData);
  useEffect(() => {
    setFeedbacks(feedbackData);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const handleChange = (e) => {
    setMessage(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name == "email") {
      document.getElementById("Email").style.borderColor = "";
    }
    if (e.target.name == "name") {
      document.getElementById("name").style.borderColor = "";
    }
    if (e.target.name == "message") {
      document.getElementById("Message").style.borderColor = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      document.getElementById("name").style.borderColor = "red";

      return;
    }
    if (!formData.rating) {
      document.getElementById("rating").style.color = "red";
      return;
    }
    if (!formData.email) {
      document.getElementById("Email").style.borderColor = "red";
      return;
    }
    if (!isEmail(formData.email)) {
      document.getElementById("Email").style.borderColor = "red";
      return;
    }

    if (!formData.message) {
      document.getElementById("Message").style.borderColor = "red";
      return;
    }
    setFeedbacks([...feedbackData, { ...formData }]);
    const res = await dispatch(submitFeedback(formData));

    setMessage(res?.payload?.message);
    setFormData({ name: "", email: "", rating: 0, message: "" });
  };
  useEffect(() => {
    const startAnimation = async () => {
      while (true) {
        await controls.start({ x: "-100%" });

        controls.set({ x: "0%" });
      }
    };
    startAnimation();
  }, [controls]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    controls.start({ x: `-${currentIndex * 100}%` });
  }, [currentIndex, controls]);
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
        noValidate
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className=" p-6 rounded-lg  shadow-lg w-full max-w-lg"
      >
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 w-1/2 border bg-transparent  border-[#00f7ff] rounded-lg outline-none"
          />
          <input
            type="email"
            name="email"
            id="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 w-1/2 border-1  bg-transparent border-[#00f7ff] rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label id="rating" className="block mb-2">
            Rating:
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer ${
                  formData.rating >= star ? "text-yellow-400" : "text-gray-500"
                }`}
                onClick={() => {
                  setFormData({ ...formData, rating: star });
                  document.getElementById("rating").style.color = "";
                }}
              />
            ))}
          </div>
        </div>

        <textarea
          name="message"
          id="Message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="p-3 w-full bg-transparent border-1 border-[#00f7ff] rounded-lg focus:outline-none mb-4"
          rows="4"
        ></textarea>

        <button
          type="submit"
          disabled={message}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg w-full"
        >
          {message ? message : "Submit Feedback"}
        </button>
      </motion.form>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.2, ease: "easeIn" }}
        className=" mt-10 max-[530px]:w-[90%] w-[600px] items-center  flex justify-center relative"
      >
        <div className=" max-[530px]:w-[80%] w-[500px] overflow-hidden ">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-cyan-400 cursor-pointer bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
          >
            <FaChevronLeft size={24} />
          </button>

          {/* Carousel Content */}
          <motion.div
            className="flex"
            animate={controls}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            {feedbacks?.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="max-[530px]:w-[90%] w-[500px] flex-shrink-0 bg-opacity-40 p-6 border-cyan-400 backdrop-blur-lg border rounded-lg shadow-lg mx-auto"
                >
                  <h3 className="text-lg font-bold text-cyan-400">
                    {feedback.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{feedback.email}</p>
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={20}
                        className={
                          i < feedback.rating
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-gray-300">{feedback.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No feedback available</p>
            )}
          </motion.div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-cyan-400 cursor-pointer bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
