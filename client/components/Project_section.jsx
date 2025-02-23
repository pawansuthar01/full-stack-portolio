import { useSelector } from "react-redux";
import image from "../src/assets/298.kb.jpg";
import image2 from "../src/assets/download (1).jpeg";
import image3 from "../src/assets/download (2).jpeg";
import image4 from "../src/assets/download.jpeg";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

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

const formatMongoDateToIndian = (projectUploadDate) => {
  const date = new Date(projectUploadDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: [0, 2, -2, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export default function Project() {
  const { projectData } = useSelector((state) => state?.DataStore);

  return (
    <section className="mx-auto p-6 max-sm:p-0 text-white ">
      <div className="flex justify-center">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 10 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-[#00f7ff]   gap-1 flex text-xl justify-center  items-center font-bold mb-4  w-42 text-center px-2"
        >
          My Projects
          <samp className="bg-[#00f7ff] mt-2 w-6 h-[2px]  rounded"></samp>
        </motion.h1>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap justify-center gap-6 items-stretch"
      >
        {projectData?.length > 0 &&
          projectData?.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="bg-[#242424]/80 w-[300px] overflow-hidden p-4 h-full rounded-xl border border-[#00f7ff]/50 shadow-lg transition-transform"
            >
              <motion.img
                className="w-full cursor-pointer  hover:scale-101 h-40 object-cover object-center rounded-md"
                src={project.image}
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
              <button className="border-1 w-full border-[#00f7ff] hover:bg-[#00f7ff] hover:text-white hover:shadow-[0_0_2px_0_#00f7ff] hover:-rotate-z-1 cursor-pointer rounded py-1 mt-2">
                View
              </button>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
