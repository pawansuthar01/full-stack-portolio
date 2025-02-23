import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { About } from "../About_section";
import { AboutUpdate } from "../../src/Redux/Slice/Admin";

export default function AboutUpdater() {
  const { aboutData } = useSelector((state) => state?.DataStore);
  const [AboutData, setAboutData] = useState({
    title: aboutData[0]?.title,
    description: aboutData[0]?.description,
    image: null,
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handelImageUpload = async (e) => {
    const image = e.target.files[0];

    setAboutData({ ...AboutData, image: image });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  };
  const HandelInput = (e) => {
    setMessage(false);
    const { name, value } = e?.target;

    setAboutData({ ...AboutData, [name]: [value] });
  };
  const handelUpdateAbout = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", AboutData?.title);
    if (AboutData?.image) {
      formData.append("photo", AboutData?.image);
    }

    formData.append("description", AboutData?.description);
    setLoading(true);
    setMessage("Loading...");

    const res = await dispatch(AboutUpdate(formData));
    setMessage(res?.payload?.message);
  };

  return (
    <div className="min-h-screen flex flex-col mt-20 items-center justify-center bg-[#242424] text-white p-5">
      {/* Live Preview Section */}
      <About
        Title={AboutData?.title}
        image={previewImage}
        description={AboutData?.description}
      />

      {/* Input Form */}
      <motion.form
        noValidate
        onSubmit={handelUpdateAbout}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 w-full max-w-3xl p-6 rounded-xl shadow-[0_0_5px_0_cyan]"
      >
        <div className="mb-4">
          <label className="block text-gray-300">Title:</label>
          <input
            type="text"
            name="title"
            value={AboutData?.title}
            onChange={HandelInput}
            className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Description:</label>
          <textarea
            name="description"
            value={AboutData?.description}
            onChange={HandelInput}
            className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Upload Image:</label>
          <input
            type="file"
            name="image"
            onChange={handelImageUpload}
            className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition"
        >
          {message ? message : "  Update About"}
        </button>
      </motion.form>
    </div>
  );
}
