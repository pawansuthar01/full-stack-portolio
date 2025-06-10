import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Filter, Github } from "lucide-react";
import { ProjectCart } from "./ui/projectCart";
import { Link, useNavigate } from "react-router-dom";

const formatMongoDateToIndian = (projectUploadDate) => {
  const date = new Date(projectUploadDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function Project() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Web App", "AI Tool", "Admin", "API"];
  const { projectData } = useSelector((state) => state?.DataStore);
  const filteredProjects =
    selectedFilter === "All"
      ? projectData
      : projectData.filter((project) =>
          project?.tags?.some((tag) =>
            tag?.name.toLowerCase().includes(selectedFilter.toLowerCase())
          )
        );

  return (
    <section className="mx-auto p-6 max-sm:p-0 text-white ">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            A showcase of my latest work, featuring innovative solutions and
            cutting-edge technologies.
          </p>

          {/* Filter Buttons */}
        </motion.div>

        <motion.div
          key={selectedFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects?.map((project, index) => (
            <ProjectCart key={index} project={project} index={index} />
          ))}
        </motion.div>
        <div>
          <motion.div
            onClick={() => navigate("/projects")}
            className=" text-center  pt-5   flex justify-center gap-2 items-center "
          >
            <span className="hover:border-b-2   border-0  border-purple-600 cursor-pointer pb-2 bg-gradient-to-r from-[Var(--span-gradient-from-color)] to-[Var(--span-gradient-to-color)]  text-transparent bg-clip-text">
              view All project
            </span>
            <ArrowRight size={18} className="text-purple-800 " />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
