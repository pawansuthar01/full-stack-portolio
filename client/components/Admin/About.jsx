import { useState } from "react";
import { motion } from "framer-motion";

export default function AboutUpdater() {
  const [title, setTitle] = useState("About Me");
  const [description, setDescription] = useState(
    "I am a passionate full-stack developer with expertise in modern web technologies."
  );
  const [image, setImage] = useState(null);

  return (
    <div className="min-h-screen flex flex-col mt-20 items-center justify-center bg-[#242424] text-white p-5">
      {/* Live Preview Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-6 rounded-xl text-center"
      >
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-2 border-cyan-500"
          />
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 w-full max-w-3xl p-6 rounded-xl shadow-[0_0_5px_0_cyan]"
      >
        <div className="mb-4">
          <label className="block text-gray-300">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Upload Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <button className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition">
          Update About
        </button>
      </motion.div>
    </div>
  );
}
