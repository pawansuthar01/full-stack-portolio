import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner, updateBanner } from "../features/banner/BannerSlice";
import toast from "react-hot-toast";

export default function BannerPage() {
  const dispatch = useDispatch();
  const { banner, loading } = useSelector((state) => state?.banner);

  const [form, setForm] = useState({
    title: "",
    titles: [],
    name: "",
    description: "",
    photo: "",
  });

  const [preview, setPreview] = useState(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchBannerData() {
      try {
        await dispatch(fetchBanner());
        setForm({
          title: banner?.title || "",
          titles: banner?.titles || [],
          name: banner?.name || "",
          description: banner?.description || "",
          photo: banner?.photo || "",
        });
        setPreview(banner?.photo);
      } catch {
        alert("Failed to load banner data");
      }
    }
    fetchBannerData();
  }, [dispatch, banner?.photo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "titles") {
      setForm({ ...form, titles: value.split(",").map((t) => t.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      form.titles.forEach((t) => formData.append("titles", t));
      formData.append("description", form.description);
      formData.append("name", form.name);
      if (form.photo instanceof File) {
        formData.append("photo", form.photo);
      }
      setUploading(true);
      const res = await dispatch(updateBanner(formData));
      setUploading(false);

      res?.payload?.success
        ? toast.success(res?.payload?.message)
        : toast.error(res?.payload?.message);
    } catch {
      alert("Failed to update banner");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Banner Display */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📸 Current Banner
          </h2>
          <img
            src={banner?.photo}
            alt="Banner"
            className="w-full h-52 object-cover rounded-lg border"
          />
          <div className="mt-3 space-y-1 text-gray-700">
            <p>
              <strong>Title:</strong> {banner?.title}
            </p>
            <p>
              <strong>Titles:</strong> {banner?.titles?.join(", ")}
            </p>
            <p>
              <strong>Name:</strong> {banner?.name}
            </p>
            <p>
              <strong>Description:</strong> {banner?.description}
            </p>
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            🛠️ Update Banner
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Titles (comma-separated)
              </label>
              <input
                name="titles"
                value={form.titles.join(", ")}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded-md resize-none"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 h-40 w-full object-cover rounded-md border"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
