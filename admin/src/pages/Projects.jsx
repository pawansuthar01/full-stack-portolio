import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  setCurrentProject,
  clearError,
} from "../features/projects/projectsSlice";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Github,
  X,
  Save,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "../components/ImageUI";

const Projects = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const dispatch = useDispatch();
  const { projects, currentProject, isLoading, error } = useSelector(
    (state) => state.projects
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const openModal = (mode, project = null) => {
    setModalMode(mode);
    setImageUrl(project?.image);
    if (project) {
      dispatch(setCurrentProject(project));
      // Set form values for editing
      Object.keys(project).forEach((key) => {
        if (key === "tags") {
          setValue(key, project[key].join(", "));
        } else {
          setValue(key, project[key]);
        }
      });
    } else {
      dispatch(setCurrentProject(null));
      reset();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode("create");
    dispatch(setCurrentProject(null));
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const tagsArray = data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category || "");
      formData.append("description", data.description || "");
      formData.append("liveUrl", data.liveUrl || "");
      formData.append("githubUrl", data.githubUrl || "");
      formData.append("featured", data.featured ? "true" : "false");

      // 🔁 Append tags as individual items (or as JSON if backend expects that)
      tagsArray.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      // ✅ Append image if it’s a File
      if (imageUrl instanceof File) {
        formData.append("image", imageUrl);
      }

      if (modalMode === "create") {
        const result = await dispatch(createProject(formData));
        if (result.type == "projects/createProject/fulfilled") {
          toast.success("Project created successfully!");
          closeModal();
        }
      } else if (modalMode === "edit") {
        console.log(formData);
        const result = await dispatch(
          updateProject({
            id: currentProject._id,
            projectData: formData,
          })
        );
        if (result.type === "projects/updateProject/fulfilled") {
          toast.success("Project updated successfully!");
          closeModal();
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to save project");
    }
  };
  const handelImageChange = (url) => {
    if (url) {
      setImageUrl(url);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await dispatch(deleteProject(id));
      if (result.type == "projects/deleteProject/fulfilled") {
        toast.success("Project deleted successfully!");
        setShowDeleteConfirm(null);
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={() => openModal("create")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects &&
          projects.length > 0 &&
          projects?.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              {project.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-contain rounded-lg"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      {project.title}
                      {project.featured && (
                        <Star className="w-4 h-4 ml-2 text-yellow-500 fill-current" />
                      )}
                    </h3>
                    {project.category && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                        {project.category}
                      </span>
                    )}
                  </div>
                </div>

                {project.description && (
                  <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    {project.description}
                  </p>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal("view", project)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal("edit", project)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(project._id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {projects.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No projects found. Create your first project!
          </p>
        </div>
      )}

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {modalMode === "create" && "Add New Project"}
                    {modalMode === "edit" && "Edit Project"}
                    {modalMode === "view" && "Project Details"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {modalMode === "view" ? (
                  <div className="space-y-4">
                    {currentProject?.image && (
                      <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="w-full h-48 object-contain rounded-lg"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {currentProject?.title}
                      </h4>
                      {currentProject?.category && (
                        <p className="text-sm text-gray-600">
                          Category: {currentProject.category}
                        </p>
                      )}
                    </div>
                    {currentProject?.description && (
                      <p className="text-gray-700">
                        {currentProject.description}
                      </p>
                    )}
                    {currentProject?.tags && currentProject.tags.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Tags:
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {currentProject.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {(currentProject?.liveUrl || currentProject?.githubUrl) && (
                      <div className="flex space-x-4">
                        {currentProject.liveUrl && (
                          <a
                            href={currentProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Live Demo
                          </a>
                        )}
                        {currentProject.githubUrl && (
                          <a
                            href={currentProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-gray-600 hover:text-gray-700"
                          >
                            <Github className="w-4 h-4 mr-1" />
                            Source Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        {...register("title", {
                          required: "Title is required",
                        })}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <input
                        {...register("category")}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...register("description")}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tags (comma-separated)
                      </label>
                      <input
                        {...register("tags")}
                        type="text"
                        placeholder="React, Node.js, MongoDB"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <ImageUpload
                        value={imageUrl || ""}
                        onChange={handelImageChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Live URL
                      </label>
                      <input
                        {...register("liveUrl")}
                        type="url"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        GitHub URL
                      </label>
                      <input
                        {...register("githubUrl")}
                        type="url"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        {...register("featured")}
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Featured Project
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        // disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {modalMode === "create" ? "Create" : "Update"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Project
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this project? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
