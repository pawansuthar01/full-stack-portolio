import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import image2 from "../../src/assets/298.kb.jpg";
import image3 from "../../src/assets/298.kb.jpg";
import image4 from "../../src/assets/298.kb.jpg";

const ProjectList = [
  {
    _id: "1",
    title: "New Project",
    Image: image2,
    description: "Task to add project",
    tags: [{ tag: "React" }, { tag: "Tailwind" }, { tag: "MongoDB" }],
  },
  {
    _id: "2",
    title: "E-Commerce App",
    Image: image3,
    description: "Building an online store with payment integration",
    tags: [{ tag: "Next.js" }, { tag: "Node.js" }, { tag: "Stripe" }],
  },
  {
    _id: "3",
    title: "Portfolio Website",
    Image: image4,
    description:
      "A stunning portfolio with animations and dark mode A stunning portfolio with animations and dark mode A stunning portfolio with animations and dark modeA stunning portfolio with animations and dark modeA stunning portfolio with animations and dark modeA stunning portfolio with animations and dark modeA stunning portfolio with animations and dark modeA stunning portfolio with animations and dark mode ",
    tags: [{ tag: "React" }, { tag: "Framer Motion" }, { tag: "Tailwind" }],
  },
];
export default function ProjectManager() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A full-stack e-commerce platform with React & Node.js.",
      image: "https://via.placeholder.com/150",
      tags: ["React", "Node.js", "MongoDB"],
    },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: null,
    tags: "",
  });

  const [editProject, setEditProject] = useState(null);

  const handleEditClick = (project) => {
    setEditProject({ ...project });
  };

  const handleSaveEdit = () => {
    setProjects(
      projects.map((proj) =>
        proj._id === editProject._id ? editProject : proj
      )
    );
    setEditProject(null);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project._id !== id));
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.image)
      return;
    setProjects([
      ...projects,
      {
        id: projects.length + 1,
        title: newProject.title,
        description: newProject.description,
        image: URL.createObjectURL(newProject.image),
        tags: newProject.tags.split(",").map((tag) => tag.trim()),
      },
    ]);
    setNewProject({ title: "", description: "", image: null, tags: "" });
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
          {ProjectList.map((project) => (
            <motion.div
              key={project._id}
              className="p-4 border w-[350px] border-cyan-400 rounded-lg shadow-lg relative"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={project.Image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-300 text-sm mt-1">
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap mt-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm bg-cyan-500   px-2 py-1 rounded-full"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
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
        <div className="fixed inset-0 border-cyan-400 backdrop-blur-lg flex items-center justify-center">
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
              value={editProject.tags.map((tag) => tag.tag).join(", ")} // Array ko string me convert kare
              onChange={(e) =>
                setEditProject({
                  ...editProject,
                  tags: e.target.value
                    .split(",")
                    .map((tag) => ({ tag: tag.trim() })), // Har tag ko object ke format me rakhe
                })
              }
              className="w-full p-2 mb-3 rounded border border-gray-600 text-white"
            />

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
          onChange={(e) =>
            setNewProject({ ...newProject, image: e.target.files[0] })
          }
          className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400 mb-3"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newProject.tags}
          onChange={(e) =>
            setNewProject({ ...newProject, tags: e.target.value })
          }
          className="w-full p-2 rounded border border-gray-600 focus:border-cyan-400 mb-3"
        />
        <button
          onClick={handleAddProject}
          className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition"
        >
          <FaPlus /> Add Project
        </button>
      </motion.div>
    </div>
  );
}
