import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const SkillsChart = () => {
  const { skillsData } = useSelector(
    (state) => state?.DataStore ?? { skillsData: [] }
  );

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className=" text-white max-sm:text-center  mb-20 rounded-lg mx-auto p-6"
    >
      <motion.h1
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeIn" }}
        className="text-[#00f7ff] r  gap-1 flex text-xl justify-center items-center font-bold mb-4  w-42 text-center px-2"
      >
        My Skills
        <samp className="bg-[#00f7ff] mt-2 w-6 h-[2px]  rounded"></samp>
      </motion.h1>
      <div className="grid grid-cols-2 gap-6 max-[800px]:grid-cols-1">
        {skillsData?.length > 0 &&
          skillsData.map((group, index) => (
            <div
              key={index}
              className="flex flex-col   rounded-2xl    p-5 shadow-[0_0_5px_0px_#3C3D37] gap-2"
            >
              <h2 className="text-lg font-semibold  mb-4">{group.title}</h2>
              {group.skills.map((skill, idx) => (
                <div key={idx} className="mb-3 relative">
                  <div className="flex justify-between font-bold">
                    <span>{skill?.name}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-3 rounded relative">
                    {/* Skill Bar */}
                    <motion.div
                      className="bg-[#00f7ff] h-3 rounded"
                      initial={{ width: 0 }}
                      animate={{
                        width: isVisible ? `${skill?.level}%` : "0%",
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Skill Percentage Box */}
                    <motion.span
                      className="absolute -top-8 text-sm font-serif text-gray-900 bg-[#00f7ff] px-2 py-1 rounded-md shadow-md"
                      initial={{ left: "0%" }}
                      animate={{
                        left: isVisible
                          ? `${
                              skill.level > 90
                                ? skill.level - 9
                                : skill.level < 40
                                ? 90
                                : skill.level
                            }%`
                          : "0%",
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillsChart;
