import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSocialData } from "../../src/Redux/Slice/Admin";
import toast from "react-hot-toast";

const SocialUpdate = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { SocialLinkData } = useSelector((state) => state?.DataStore);
  const [Data, setData] = useState(SocialLinkData[0]);
  const [formData, setFormData] = useState({
    instagram: "",
    linkedin: "",
    facebook: "",
    git: "",
    x: "",
    cv: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      instagram: Data?.instagram || "",
      linkedin: Data?.linkedin || "",
      facebook: Data?.facebook || "",
      git: Data?.git || "",
      x: Data?.x || "",
      cv: Data?.cv || "",
    });
  }, [Data]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !formData.instagram ||
      !formData.x ||
      !formData.cv ||
      !formData.facebook ||
      !formData.git ||
      !formData.linkedin
    ) {
      setError(
        "instagram, x,cv,git facebook and linkedin Link is required to update."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(updateSocialData(formData));

      setLoading(false);
      if (response.payload.success) {
        toast.success(response.payload.message);
        setData(response?.payload?.data);
      } else {
        toast.error(response.payload.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto  min-h-screen lg:p-8 p-2 mt-20 mb-2 bg-[#242424]">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-white">
        Social Data Update
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-[#333] border-cyan-200 border-1 rounded-md shadow-[0_0_5px_0_cyan] p-2 m-2"
      >
        {/* Address */}

        {/* Instagram */}
        <div className="mb-4">
          <label
            htmlFor="cv"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            cv Link
          </label>
          <input
            type="url"
            id="cv"
            name="cv"
            value={formData.cv}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded text-white"
            placeholder="Enter cv link"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="instagram"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Instagram Link
          </label>
          <input
            type="url"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded text-white"
            placeholder="Enter Instagram link"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="facebook"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            facebook Link
          </label>
          <input
            type="url"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded text-white"
            placeholder="Enter facebook link"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="x"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            x Link
          </label>
          <input
            type="url"
            id="x"
            name="x"
            value={formData.x}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded text-white"
            placeholder="Enter x link"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Linkedin Link
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded text-white"
            placeholder="Enter linkedin link"
          />
        </div>

        {/* Facebook */}
        <div className="mb-4">
          <label
            htmlFor="git"
            className="block text-sm font-medium text-white "
          >
            git account Link
          </label>
          <input
            type="url"
            id="git"
            name="git"
            value={formData.git}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded text-white"
            placeholder="Enter git account link"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SocialUpdate;
