import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Banner_section from "../Banner_section";
import { useDispatch, useSelector } from "react-redux";
import { updateBanner } from "../../src/Redux/Slice/Admin";

export default function BannerUpdater() {
  const dispatch = useDispatch();
  const { bannerData } = useSelector((state) => state?.DataStore);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [BannerData, setBannerData] = useState({
    title: bannerData[0]?.title,
    description: bannerData[0]?.description,
    name: bannerData[0]?.name,
    smallDescription: bannerData[0]?.smallDescription,
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const HandelInput = (e) => {
    setMessage(false);
    const { name, value } = e?.target;

    setBannerData({ ...BannerData, [name]: [value] });
  };
  const handelImageUpload = async (e) => {
    const image = e.target.files[0];
    setBannerData({ ...BannerData, image: image });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  };

  const handelUpdateBanner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", BannerData?.title);
    if (BannerData?.image) {
      formData.append("photo", BannerData?.image);
    }
    formData.append("name", BannerData?.name);
    formData.append("description", BannerData?.description);
    formData.append("smallDescription", BannerData?.smallDescription);
    setLoading(true);
    setMessage("Loading..");
    const res = await dispatch(updateBanner(formData));
    setMessage(res?.payload?.message);
  };

  return (
    <div className="min-h-screen flex flex-col mt-20 items-center justify-center bg-[#242424] text-white p-5">
      {/* Live Preview Section */}
      <Banner_section
        image={previewImage}
        title={BannerData?.title}
        name={BannerData?.name}
        description={BannerData?.description}
        smallDescription={BannerData?.smallDescription}
      />

      <motion.form
        noValidate
        onSubmit={handelUpdateBanner}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 w-full max-w-3xl  p-6 rounded-xl shadow-[0_0_5px_0_cyan]"
      >
        <div className="mb-4">
          <label className="block text-gray-300">Title:</label>
          <input
            type="text"
            name="title"
            value={BannerData?.title}
            onChange={HandelInput}
            className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Name:</label>
          <input
            type="text"
            value={BannerData?.name}
            name="name"
            onChange={HandelInput}
            className="w-full p-2 rounded  border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300"> And I am a:</label>
          <input
            type="text"
            name="smallDescription"
            value={BannerData?.smallDescription}
            onChange={HandelInput}
            className="w-full p-2 rounded  border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Description:</label>
          <textarea
            name="description"
            value={BannerData?.description}
            onChange={HandelInput}
            className="w-full p-2 rounded  border border-gray-600 focus:border-cyan-400"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Upload Image:</label>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/svg+xml, image/webp"
            onChange={handelImageUpload}
            className="w-full p-2 rounded  border border-gray-600 focus:border-cyan-400"
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition"
        >
          {message ? message : "Update Banner"}
        </button>
      </motion.form>
    </div>
  );
}
