import { motion } from "framer-motion";
import Photo from "../src/assets/298.kb.jpg";
export default function Banner_section() {
  return (
    <section className=" lg:text-start text-center min-h-screen lg:h-screen   justify-center   flex flex-wrap  items-center w-full  bg-[#242424] ">
      <motion.div className="lg:mr-28 lg:w-[40%]  mr-0 p-10 lg:p-0 ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeIn" }}
          className="text-3xl font-extrabold  max-sm:text-2xl max-[400px]:text-xl"
        >
          Hello,it's Me
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className="font-bold text-5xl py-2 capitalize max-[400px]:text-3xl"
        >
          Pawan Kumar
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className="font-bold text-2xl max-sm:text-xl max-[400px]:text-sm"
        >
          And I'm a{" "}
          <span className="text-[#00f7ff] cursor-pointer capitalize">
            full stack Developer
          </span>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className=" text-[15px] pt-2 max-[550px]:text-[14px]"
        >
          I am a motivated and versatile individual, always eager to take on new
          challenges. With a passion for learning, I am dedicated to delivering
          high-quality results. My positive attitude and growth mindset enable
          me to adapt quickly and contribute meaningfully to any endeavor. I
          strive for continuous improvement and am committed to achieving great
          things
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
          className=" lg:w-[50%] mt-4 rounded-xl px-4 py-2 font-normal font-serif  hover:bg-[#00f7ff] border-2 hover:text-white cursor-pointer max-[400px]:text-sm border-[#00f7ff] text-[#00f7ff] hover:shadow-[0_0px_5px_#00f7ff]"
        >
          Check Resume
        </motion.button>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.8,
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="bg-cyan-500 h-[310px] max-[400px]:h-[250px] max-[400px]:w-[250px]   w-[310px]   shadow-[0_0_10px_0px_cyan] rounded-[50%] flex justify-center items-center  cursor-pointer "
        >
          <img
            className="w-[300px] h-[300px]  max-[400px]:h-[240px] max-[400px]:w-[240px]   rounded-[50%] object-cover  object-center bg-cyan-500 "
            src={Photo}
            alt="User_Banner_Photo"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
