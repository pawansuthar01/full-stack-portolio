import {
  Calendar,
  Code,
  ExternalLink,
  Eye,
  Github,
  Play,
  Star,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { motion } from "framer-motion";

export const ProjectCart = ({ project, index }) => {
  const [selectedProject, setSelectedProject] = useState({});
  return (
    <>
      <div>
        <motion.div
          key={project._id || index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`group relative bg-dark-800/50 rounded-2xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 overflow-hidden cursor-pointer `}
          onClick={() =>
            setSelectedProject(
              selectedProject === project.id ? null : project.id
            )
          }
        >
          <div className={`relative overflow-hidden`}>
            <img
              src={project.image}
              alt={project.title}
              className={`object-cover group-hover:scale-110 transition-transform duration-500 ${"w-full h-48"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {project.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                Featured
              </div>
            )}

            {/* Enhanced Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.link && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-green-500/90 text-white rounded-full hover:bg-green-600 transition-all duration-200 group/btn shadow-lg"
                  title="Live Demo"
                >
                  <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-dark-900/90 text-white rounded-full hover:bg-dark-800 transition-all duration-200 group/btn shadow-lg"
                  title="View Code"
                >
                  <Code className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                </a>
              )}
            </div>

            {/* Live Indicator */}
            {project.link && (
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-white bg-dark-900/80 px-2 py-1 rounded-full">
                  Live
                </span>
              </div>
            )}
          </div>

          <div className="p-6 flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-400">4.8</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(
                      selectedProject === project._id ? null : project._id
                    );
                  }}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors duration-300">
              {project.title}
            </h3>

            <p
              className={`text-gray-400 mb-4 transition-all duration-300 ${
                selectedProject === project?._id || "line-clamp-3"
              }`}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project?.tags
                ?.slice(0, selectedProject === project?._id ? undefined : 3)
                ?.map((tech) => (
                  <span
                    key={tech._id}
                    className="text-xs px-2 py-1 bg-dark-700 text-gray-300 rounded-md hover:bg-dark-600 transition-colors duration-200"
                  >
                    {tech.name}
                  </span>
                ))}
              {selectedProject !== project?._id &&
                project?.tags?.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-dark-700 text-gray-400 rounded-md">
                    +{project?.tags?.length - 3} more
                  </span>
                )}
            </div>

            {/* Enhanced Project Stats */}
            <div className="pt-4 border-t border-dark-700 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                  4.8
                </span>
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  1.2k
                </span>
                <span className="flex items-center">
                  <Github className="w-3 h-3 mr-1" />
                  24
                </span>
              </div>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />2 days ago
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
