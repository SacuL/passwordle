import React from "react";
import { motion } from "framer-motion";

export const GitHubRibbon: React.FC = () => {
  return (
    <motion.a
      href="https://github.com/sacul/passwordle"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-0 right-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -right-28 top-3 rotate-45 bg-[#2196F3] px-32 py-4 text-base font-bold text-white shadow-lg before:absolute before:left-0 before:right-0 before:top-1 before:h-[1px] before:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)] after:absolute after:left-0 after:right-0 after:bottom-1 after:h-[1px] after:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)]">
          Add to your project!
        </div>
        <div className="absolute -right-28 top-3 rotate-45 bg-[#1976D2] px-32 py-4 text-base font-bold text-white shadow-lg before:absolute before:left-0 before:right-0 before:top-1 before:h-[1px] before:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)] after:absolute after:left-0 after:right-0 after:bottom-1 after:h-[1px] after:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)]">
          Add to your project!
        </div>
      </div>
    </motion.a>
  );
};
