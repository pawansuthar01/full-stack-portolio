import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const speed = 0.2;

    const updatePosition = () => {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;

      setMousePosition({ x: currentX, y: currentY });
      requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const mouseEnter = () => setCursorVariant("hover");
    const mouseLeave = () => setCursorVariant("default");

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(updatePosition);
    const internatEle = document.querySelectorAll(
      'a,button,[role="button"], input'
    );
    internatEle.forEach((el) => {
      el.addEventListener("mouseenter", mouseEnter);
      el.addEventListener("mouseleave", mouseLeave);
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      internatEle.forEach((el) => {
        el.addEventListener("mouseenter", mouseEnter);
        el.addEventListener("mouseleave", mouseLeave);
      });
    };
  }, []);
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
      opacity: 0.8,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };
  return (
    <>
      <motion.div
        className="fixed top-0 w-8 h-8 left-0 bg-gradient-to-r   from-emerald-500 to-[#00f7ff] rounded-full  pointer-events-none z-50 mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.5,
        }}
      />
      <motion.div
        className=" fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.2,
        }}
      />
    </>
  );
};

export default CustomCursor;
