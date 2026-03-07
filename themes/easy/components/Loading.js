import { motion } from "framer-motion";
import React from "react";
import { useGlobal } from '@/lib/global'



const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut"
};

export default function ThreeDotsWave(props) {
const { isDarkMode } = useGlobal()
const LoadingDot = {
    display: "block",
    width: "2rem",
    height: "2rem",
    backgroundColor: isDarkMode ? "white" : "black",
    borderRadius: "50%"
  };
  return (
    <motion.div {...props} className="processBar z-50">
        <motion.div
        style={{
            paddingTop: "5rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        >
        <motion.div
            style={LoadingContainer}
            variants={ContainerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
            />
            <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
            />
            <motion.span
            style={LoadingDot}
            variants={DotVariants}
            transition={DotTransition}
            />
        </motion.div>
        </motion.div>
    </motion.div>
  );
}
