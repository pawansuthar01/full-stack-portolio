import { motion } from "framer-motion";
import { Award, Calendar, Coffee, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Layout } from "../../layout/layout";
import AboutPageSkeleton from "../../components/skeleton/AboutPageSkeleton";
import { useDispatch, useSelector } from "react-redux";
import DynamicIcon from "../../components/ui/DynamicIcon";
import { getAllData } from "../Redux/Slice/getData";
const AboutPage = () => {
  const { aboutData } = useSelector((state) => state?.DataStore);
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!aboutData[0]) {
      dispatch(getAllData());
    }
  }, []);
  // const timeline = [
  //   {
  //     year: "2020",
  //     title: "Started Web Development Journey",
  //     description: "Began learning HTML, CSS, and JavaScript",
  //   },
  //   {
  //     year: "2021",
  //     title: "First Freelance Project",
  //     description:
  //       "Completed my first client project - a local business website",
  //   },
  //   {
  //     year: "2022",
  //     title: "Full-Stack Development",
  //     description: "Expanded skills to include Node.js, React, and databases",
  //   },
  //   {
  //     year: "2023",
  //     title: "Professional Developer",
  //     description: "Working with startups and established companies",
  //   },
  // ];

  // const facts = [
  //   { icon: Coffee, label: "Cups of Coffee", value: "500+" },
  //   { icon: Award, label: "Projects Completed", value: "50+" },
  //   { icon: Heart, label: "Happy Clients", value: "25+" },
  //   { icon: Calendar, label: "Years Experience", value: "3+" },
  // ];
  if (!aboutData[0]) {
    return <AboutPageSkeleton />;
  }
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl text-[Var(--text-Primary-color)] lg:text-7xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-[Var(--span-gradient-from-color)] to-[Var(--span-gradient-to-color)] bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate developer with a love for creating digital experiences
              that make a difference
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="lg:grid flex justify-center  flex-col items-center lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">My Story</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                {aboutData[0]?.description ||
                  ` <p>
                  Hi! I'm Pawan Kumar, a passionate full-stack developer based
                  in San Francisco. My journey into the world of programming
                  began during college when I discovered the power of code to
                  solve real-world problems.
                </p>
                <p>
                  What started as curiosity quickly turned into a passion. I
                  spent countless hours learning new technologies, building
                  projects, and pushing the boundaries of what I thought was
                  possible. Today, I specialize in creating modern, scalable web
                  applications that deliver exceptional user experiences.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community. I believe in the power
                  of collaboration and continuous learning.
                </p>`}
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative flex justify-center w-full mx-auto h-auto sm:h-[350px]   md:w-[350px] lg:w-[400px]"
            >
              <div className="aspect-square absolute rotate-3  w-full h-full bg-gradient-to-br from-[Var(--span-gradient-from-color)] to-[Var(--span-gradient-to-color)] rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <img
                  src={aboutData[0]?.AboutPageImage}
                  className="w-[95%] h-[95%] object-cover rounded-2xl absolute -rotate-3"
                />
              </div>
            </motion.div>
          </div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              My Journey
            </h2>
            <div className="relative ">
              {/* Timeline Line */}
              <div
                className={`absolute ${
                  isMobile
                    ? "right-[8px] transform-none"
                    : "left-1/2 transform -translate-x-1/2"
                } w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-500`}
              />

              <div ref={ref} className="space-y-12">
                {aboutData[0]?.myJourney.map((item, index) => (
                  <motion.div
                    key={index || item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.2, delay: 0.1 + index * 0.2 }}
                    className={`flex items-center ${
                      !isMobile
                        ? index % 2 === 0
                          ? "flex-row"
                          : "flex-row-reverse"
                        : "flex-row w-full"
                    }`}
                  >
                    <div
                      className={`    ${
                        !isMobile
                          ? index % 2 === 0
                            ? "text-right pr-8 w-1/2 "
                            : "text-left pl-8 w-1/2 "
                          : "text-right pr-5 w-full"
                      }`}
                    >
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <div className="text-blue-400 font-bold text-lg mb-2">
                          {item.date}
                        </div>
                        <h3 className="text-white font-semibold mb-2">
                          {item.educationTitle}
                        </h3>
                        <p className="text-gray-400">
                          {item.educationDescription}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-gradient-to-br from-[Var(--span-gradient-from-color)] to-[Var(--span-gradient-to-color)] rounded-full border-4 border-gray-900" />
                    </div>

                    {!isMobile && <div className="w-1/2" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Fun Facts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData[0]?.funFact?.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{
                      opacity: 1,
                      scaleX: 1,
                    }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                      duration: 0.1,

                      delay: 0.1 + (index + 1) * 0.3,
                      ease: "linear",
                    }}
                    className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[Var(--span-gradient-from-color)] to-[Var(--span-gradient-to-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <DynamicIcon
                        iconName={fact.icon}
                        size={32}
                        className="text-white"
                      />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {fact.factCount}
                    </div>
                    <div className="text-gray-400">{fact.factDescription}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AboutPage;
