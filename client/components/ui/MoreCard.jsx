import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

export const DetailsProjectModal = ({ project, onClose }) => {
  return (
    <>
      {project && (
        <motion.div
          className="fixed overflow-y-auto  pt-[300px]    inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose(null)}
        >
          <motion.div
            className="glass-card max-w-2xl w-full   bg-gradient-to-r from-purple-500/20 border-2 border-purple-500 to-emerald-500/20 rounded-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => onClose(null)}
                className="absolute top-4 right-4 p-2 glass rounded-full bg-gradient-to-b from-black to-purple-500 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project?.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project?.tags.map((tag) => (
                  <span
                    key={tag?._id}
                    className="px-3 py-1 bg-primary-500/20 text-primary-400 bg-gradient-to-r from-pink-500 to-gray-500 rounded-full text-sm font-medium"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-medium cursor-pointer hover:scale-105 transition-transform"
                >
                  <Github size={18} />
                  View Code
                </a>
                <a
                  href={project?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 glass border border-primary-500 rounded-lg font-medium cursor-pointer hover:bg-primary-500/10 transition-colors"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
