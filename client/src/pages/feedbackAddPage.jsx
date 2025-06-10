import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Send,
  CheckCircle,
  Upload,
  User,
  Link,
} from "lucide-react";
import { submitFeedback } from "../Redux/Slice/UserSlice";
import { useDispatch } from "react-redux";

const FeedbackAddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    email: "",
    project: "",
    rating: 5,
    testimonial: "",
    avatar: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData = new FormData();
    feedbackData.append("fullName", formData.name);
    feedbackData.append("role", formData.role);
    feedbackData.append("testimonial", formData.testimonial);
    feedbackData.append("rating", formData.rating);
    feedbackData.append("company", formData.company);
    feedbackData.append("project", formData.project);
    feedbackData.append("email", formData.email);
    if (formData.avatar) {
      feedbackData.append("avatar", formData.avatar);
    }
    const res = await dispatch(submitFeedback(feedbackData));
    if (res?.payload?.success) {
      setIsSubmitted(true);
    } else {
      console.error(res?.payload?.message);
    }
    setIsSubmitting(false);
  };

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.button
        key={index}
        type="button"
        onClick={interactive ? () => handleRatingChange(index + 1) : undefined}
        whileHover={interactive ? { scale: 1.1 } : {}}
        whileTap={interactive ? { scale: 0.9 } : {}}
        className={`${interactive ? "cursor-pointer" : "cursor-default"}`}
        disabled={!interactive}
      >
        <Star
          size={24}
          className={`${
            index < rating ? "text-yellow-400 fill-current" : "text-gray-400"
          } transition-colors duration-200`}
        />
      </motion.button>
    ));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle size={48} className="text-white" />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">Thank You!</h1>
          <p className="text-xl text-gray-400 mb-8">
            Your feedback has been submitted successfully.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-green-500 cursor-pointer to-emerald-600 hover:from-emerald-500 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
            >
              Give More Feedback
            </button>
          </div>

          <p className="text-gray-500 mt-8">
            Redirecting you back to the homepage...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </motion.button>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Share Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Help others learn about working with me by sharing your feedback and
            experience.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Role *
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                    placeholder="CEO, CTO, Product Manager"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                    placeholder="Your Company Name"
                  />
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Picture (Optional)
                </label>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-700/50 border-2 border-dashed border-gray-600/50 rounded-full flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <motion.label
                      htmlFor="avatar"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-600/50 cursor-pointer transition-all duration-300"
                    >
                      <Upload size={16} />
                      Choose Photo
                    </motion.label>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Project Details
              </h2>

              <div>
                <label
                  htmlFor="project"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Project Type *
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                >
                  <option value="">Select project type</option>
                  <option value="Web Application">Web Application</option>
                  <option value="E-commerce Platform">
                    E-commerce Platform
                  </option>
                  <option value="Dashboard/Admin Panel">
                    Dashboard/Admin Panel
                  </option>
                  <option value="API Development">API Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="AI/ML Tool">AI/ML Tool</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(formData.rating, true)}
                  <span className="ml-3 text-gray-400">
                    ({formData.rating}/5)
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Your Testimonial
              </h2>

              <div>
                <label
                  htmlFor="testimonial"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Share your experience *
                </label>
                <textarea
                  id="testimonial"
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                  placeholder="Tell others about your experience working with me. What did you like most? How did the project go? Would you recommend my services?"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {formData.testimonial.length}/500 characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Feedback
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            Your feedback helps me improve my services and helps potential
            clients make informed decisions.
            <br />
            All testimonials are reviewed before being published.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackAddPage;
