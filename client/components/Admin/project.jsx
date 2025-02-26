import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  DeleteProject,
  updateProject,
  UploadProject,
} from "../../src/Redux/Slice/Admin";
import LoadingButton from "../../constants/LoadingButton";

const formatMongoDateToIndian = (projectUploadDate) => {
  const date = new Date(projectUploadDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
export default function ProjectManager() {
  const { projectData } = useSelector((state) => state?.DataStore);
  const [projectsData, setProjectsData] = useState(projectData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    tags: [{ name: "" }],
  });

  const handelImageUpload = async (e) => {
    let image = e.target.files[0];
    setNewProject({ ...newProject, image: image });
  };
  const [editProject, setEditProject] = useState(null);

  const handleEditClick = (project) => {
    setEditProject({ ...project });
  };

  const handleSaveEdit = async () => {
    setProjectsData(
      projectsData.map((proj) =>
        proj._id === editProject._id ? editProject : proj
      )
    );
    setEditProject(null);
    const res = await dispatch(updateProject(editProject));

    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setProjectsData((prev) =>
        prev._id === res?.payload?.data._id ? res?.payload?.data : prev
      );
    } else {
      toast.error(res?.payload?.message);
    }
  };

  const handleDeleteProject = async (id) => {
    const isConfirm = window.confirm("Delete this project...");
    if (!isConfirm) return;
    if (!id) {
      toast.error("something Wont wrong...");
      return;
    }

    setProjectsData(projectsData.filter((project) => project._id !== id));
    const res = await dispatch(DeleteProject(id));

    res?.payload?.success
      ? toast.success(res?.payload?.message)
      : toast.error(res?.payload?.message);
  };

  const handleAddProject = async () => {
    setLoading(true);
    if (
      !newProject.title ||
      !newProject.description ||
      !newProject.image ||
      !newProject.tags ||
      !newProject.link
    ) {
      setLoading(false);
      toast.error("All filed is required to new Project");
      return;
    }
    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("image", newProject.image);
    formData.append("tags", JSON.stringify(newProject.tags));
    formData.append("link", newProject.link);
    const res = await dispatch(UploadProject(formData));
    setLoading(false);

    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setProjectsData((prevProjects) =>
        prevProjects.map((project) =>
          project._id === res?.payload?.data._id ? res?.payload?.data : project
        )
      );
    } else {
      toast.error(res?.payload?.message);
    }
    setNewProject({
      title: "",
      description: "",
      image: null,
      link: "",
      tags: [{ name: "" }],
    });
  };

  return (
    <div className="min-h-screen flex flex-col mt-20 items-center justify-center bg-[#242424] text-white p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-6 rounded-xl text-center"
      >
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div className="mt-4 flex flex-wrap justify-evenly gap-4">
          {projectsData.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.02 }}
              className="bg-[#242424]/80 w-[300px] overflow-hidden p-4 h-full rounded-xl border border-[#00f7ff]/50 shadow-lg transition-transform"
            >
              <motion.img
                className="w-full cursor-pointer  hover:scale-101 h-40 object-cover object-center rounded-md"
                src={project.image || project.PreviewImage}
                alt={project.title}
              />

              <h2 className="text-lg font-semibold mt-3 text-white">
                {project.title}
              </h2>

              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#00f7ff] text-[0.7rem] font-serif text-gray-800 px-2 py-1 rounded-full text-sm font-semibold"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-sm mt-2 line-clamp-6">
                {project.description}
              </p>

              <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                <FaCalendarAlt className="text-[#00f7ff]" />{" "}
                {formatMongoDateToIndian(project?.Date)}
              </p>
              <button
                className="border border-[#00f7ff] w-full hover:bg-[#00f7ff] hover:text-white 
             hover:shadow-[0_0_2px_0_#00f7ff] cursor-pointer rounded py-1 mt-2 transition-all"
                onClick={() => window.open(project?.link, "_blank")}
              >
                View
              </button>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  className="text-yellow-400"
                  onClick={() => handleEditClick(project)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteProject(project._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {editProject && (
        <div className="fixed inset-0 border-cyan-400 backdrop-blur-lg flex pt-20 items-center justify-center">
          <div className="bg-cyan-300/10 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Project</h2>
            <label className="text-gray-300">Title:</label>
            <input
              type="text"
              value={editProject.title}
              onChange={(e) =>
                setEditProject({ ...editProject, title: e.target.value })
              }
              className="w-full p-2 mb-3 rounded border border-gray-600  text-white"
            />

            <label className="text-gray-300">Description:</label>
            <textarea
              value={editProject.description}
              onChange={(e) =>
                setEditProject({ ...editProject, description: e.target.value })
              }
              className="w-full p-2 mb-3 h-24 rounded border border-gray-600  text-white"
            ></textarea>

            <label className="text-gray-300">Tags (comma separated):</label>
            <input
              type="text"
              value={editProject.tags.map((tag) => tag.name).join(", ")}
              onChange={(e) =>
                setEditProject({
                  ...editProject,
                  tags: e.target.value
                    .split(",")
                    .map((tag) => ({ name: tag.trim() })),
                })
              }
              className="w-full p-2 mb-3 rounded border border-gray-600 text-white"
            />
            <div className="mb-4">
              <label htmlFor="link" className="text-gray-300">
                Preview Link
              </label>
              <input
                type="url"
                id="PreviewLink"
                name="PreviewLink"
                value={editProject.link}
                onChange={(e) =>
                  setEditProject({ ...editProject, link: e.target.value })
                }
                className="w-full p-2 mb-3 rounded border border-gray-600 text-white"
                placeholder="Enter Preview link"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleSaveEdit}
                className="bg-cyan-500 px-4 py-2 rounded text-white hover:bg-cyan-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditProject(null)}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload New Project */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 w-full max-w-3xl p-6 rounded-xl shadow-[0_0_5px_0_cyan]"
      >
        <h2 className="text-2xl font-bold mb-4">Upload New Project</h2>
        <input
          type="text"
          placeholder="Project Title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400 mb-3"
        />
        <textarea
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400 mb-3"
        ></textarea>
        <input
          type="file"
          onChange={handelImageUpload}
          className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400 mb-3"
        />
        <div className="mb-4">
          <label htmlFor="link" className="text-gray-300">
            Preview Link
          </label>
          <input
            type="url"
            id="PreviewLink"
            name="PreviewLink"
            value={newProject.link}
            onChange={(e) =>
              setNewProject({ ...newProject, link: e.target.value })
            }
            className="w-full p-2 mb-3 rounded border border-gray-600 text-white"
            placeholder="https://Preview link"
          />
        </div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newProject.tags.map((tag) => tag.name).join(", ")}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              tags: e.target.value
                .split(",")
                .map((tag) => ({ name: tag.trim() })),
            })
          }
          className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400 mb-3"
        />
        <div
          onClick={handleAddProject}
          className="flex gap-2 rounded-2xl bg-cyan-500 text-white hover:bg-cyan-600 items-center justify-center"
        >
          <FaPlus />
          <LoadingButton
            textSize={"py-2 "}
            width={"w-auto"}
            loading={loading}
            message={"Uploading..."}
            name={"Add Project"}
            color={"bg-cyan-500 text-white hover:bg-cyan-600 "}
          />
        </div>
      </motion.div>
    </div>
  );
}
