import Image from "../src/assets/298.kb.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { motion } from "framer-motion";
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, duration: 0.8, ease: "easeOut" },
  },
};

// Single Letter Animation
const letterVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
export default function About() {
  const title = "Why Hire Me For Your Next Project?".split("");
  return (
    <section className="w-full mt-10 lg:mt-0 mb-22 max-sm:mb-2 flex max-[900px]:flex-col justify-center items-center  ">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        }}
        viewport={{ once: true, amount: 0.5 }}
        className="flex justify-center max-[900px]:w-[80%] items-center max-[900px]:order-2 order-1 "
      >
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#00f7ff] transform rotate-[-3deg]"></div>

          <div className="relative bg-white p-2 border-4">
            <img
              src={Image}
              alt="Profile"
              className="w-72  h-auto object-cover"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="w-[50%] ml-12 max-sm:ml-0 max-[900px]:w-[80%] max-sm:items-center max-sm:text-center max-[900px]:order-1 order-2 flex flex-col"
      >
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeIn" }}
          className="text-[#00f7ff] gap-1 flex text-xl justify-center items-center font-bold  w-42 text-center px-2"
        >
          About Me
          <samp className="bg-[#00f7ff] mt-2 w-6 h-[2px]  rounded"></samp>
        </motion.h1>
        <motion.h3
          className="text-4xl py-2 max-sm:text-2xl max-[400px]:text-lg"
          variants={textVariants}
        >
          {title.map((letter, index) => (
            <motion.span key={index} variants={letterVariant}>
              {letter}
            </motion.span>
          ))}
        </motion.h3>
        <motion.p className=" tracking-[1px]" variants={textVariants}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus modi
          voluptatem fugit debitis ab velit, beatae temporibus iusto perferendis
          quae ex numquam sed ut nobis totam non quis eum voluptas saepe
          doloremque distinctio culpa porro cum reprehenderit! Dolore, fuga
          consequuntur.
        </motion.p>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 0, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h4>Follow Us:</h4>
          <ul className="flex gap-2 mt-1 mb-5 ">
            <li className="border-1 p-1 rounded cursor-pointer hover:bg-green-400">
              <FaFacebookF size={20} />
            </li>
            <li className="border-1 p-1 rounded cursor-pointer hover:bg-red-500">
              <FaInstagram size={20} />
            </li>
            <li className="border-1 p-1 rounded cursor-pointer hover:bg-black/60">
              <FaXTwitter size={20} />
            </li>
            <li className="border-1 p-1 rounded cursor-pointer hover:bg-blue-500">
              <FaLinkedinIn size={20} />
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
