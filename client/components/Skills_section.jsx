import { motion, time } from "framer-motion";
import { Cloud, Code, Database, Wrench } from "lucide-react";
import { useInView } from "react-intersection-observer";
import React, { useState } from "react";

const SkillsChart = () => {
  const [activeCategories, setActiveCategories] = useState("Frontend");
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const skills = [
    {
      title: "Frontend",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      title: "Backend",
      icon: Database,
      color: "from-emerald-500 to-teal-500",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      title: "Cloud & DevOps",
      color: "from-purple-500 to-pink-500",
      icon: Cloud,
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      title: "Tools & Others",
      color: "from-orange-500 to-red-500",
      icon: Wrench,
      skills: [
        { name: "Git & GitHub", level: 95 },
        { name: "VS Code", level: 98 },
        { name: "Figma", level: 85 },
        { name: "Postman", level: 88 },
        { name: "Jest", level: 75 },
        { name: "Webpack", level: 72 },
      ],
    },
  ];
  const activeSkill =
    skills.find((cat) => cat.title == activeCategories)?.skills || [];
  const activeColor =
    skills.find((cat) => cat.title == activeCategories)?.color || "";

  return (
    <section className=" flex justify-center relative  overflow-hidden py-20">
      <div ref={ref} className="max-w-7xl  px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-[Var(--text-Primary-color)] text-4xl md:text-5xl font-bold mb-6 sm:mb-3 sm:text-xs ">
            Technical {"    "}
            <span className="bg-gradient-to-r   from-[Var(--span-gradient-from-color)] to-[Var(--span-gradient-to-color)] bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-[Var(--text-Secondary-color)] max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency
            levels across different domains of web development.
          </p>
        </motion.div>
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            // className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h3 className=" text-xl mb-6 font-bold text-[Var(--text-primary-color)]  ">
                Skill Categories
              </h3>
              <div className="space-y-3">
                {skills.map((cat) => {
                  const Icon = cat.icon;

                  return (
                    <motion.button
                      onClick={() => setActiveCategories(cat.title)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={cat.title}
                      className={`w-full flex  items-center p-4 gap-4  cursor-pointer rounded-xl  transition-all duration-300 ${
                        activeCategories === cat.title
                          ? "bg-gradient-to-r " +
                            cat.color +
                            " text-[Var(--text-primary-color)] shadow-lg"
                          : " bg-gary-500/20 text-[Var(--text-Secondary-color)]hover:bg-gray-700/50 border border-gray-600/30"
                      } `}
                    >
                      <Icon
                        size={24}
                        className=" text-[var(--bg-icon-color)]"
                      />
                      <span className=" font-medium">{cat.title}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${activeColor}`}
                >
                  {React.createElement(
                    skills.find((cat) => cat.title == activeCategories)?.icon ||
                      Code,
                    { size: 24, className: "text-[Var(--text-primary-color)]" }
                  )}
                </div>
                {activeCategories} Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeSkill.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">
                        {skill?.name}
                      </span>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            inView
                              ? { width: `${skill?.level}%` }
                              : { width: 0 }
                          }
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          className={`h-full bg-gradient-to-r ${activeColor} rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 1 }}
                        className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {skill.level}%
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {activeSkill.slice(0, 4).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.8 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-4 py-2 bg-gradient-to-r ${activeColor} rounded-full text-white text-sm font-medium shadow-lg`}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r mt-10 from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Continuous Learning & Growth
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                I believe in staying current with the latest technologies and
                best practices. My skill set is constantly evolving as I explore
                new tools and frameworks that can help create better solutions
                for complex problems.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                  <span className="text-gray-300">
                    Always learning new technologies
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  <span className="text-gray-300">
                    Focus on best practices and clean code
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  <span className="text-gray-300">
                    Contributing to open-source projects
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Years Experience", value: "3+" },
                { label: "Technologies", value: `${skills.length}+` },
                { label: "Projects Built", value: "50+" },
                { label: "Happy Clients", value: "25+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsChart;
