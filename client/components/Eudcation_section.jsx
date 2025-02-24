import { motion } from "framer-motion";
import { useSelector } from "react-redux";


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.3, duration: 0.5, ease: "easeInOut" },
  }),
};

export default function EducationCard() {
  const { educationData } = useSelector((state) => state?.DataStore);

  return (
    <section className="p-6 text-white ">
      <div className="flex justify-center mb-6">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 10 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-[#00f7ff]   gap-1 flex text-xl justify-center  items-center font-bold mb-4  w-42 text-center px-2"
        >
          Education
          <samp className="bg-[#00f7ff] mt-2 w-10 h-[2px]  rounded"></samp>
        </motion.h1>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-6"
      >
        {educationData?.length > 0 &&
          educationData?.map((edu, index) => (
            <div
              key={edu._id}
              className="flex w-full  relative items-center gap-6"
            >
              {/* Timeline Dot */}

              <div className=" flex flex-col items-center order-2">
                {/* Dot Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  className="w-4 h-4 bg-[#00f7ff] rounded-full absolute top-10"
                ></motion.div>

                {/* Line Animation */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "50%" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                  className="w-1 bg-[#00f7ff] rounded-full absolute top-16"
                ></motion.div>
              </div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                className="bg-[#242424]/80 order-1 w-full p-5 rounded-xl border border-[#00f7ff]/80 shadow-lg transition-transform hover:scale-102 hover:shadow-[#00f7ff]/10"
              >
                <h2 className="text-lg font-semibold text-white">
                  {edu.course}
                </h2>
                <p className="text-gray-300">{edu.institute}</p>
                <p className="text-gray-400 text-sm">{edu.year}</p>
                <p className="text-gray-300 text-sm mt-2">{edu.description}</p>
              </motion.div>
            </div>
          ))}
      </motion.div>
    </section>
  );
}
