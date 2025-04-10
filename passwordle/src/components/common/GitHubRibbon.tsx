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
        <div className="absolute -right-16 sm:-right-28 top-2 sm:top-3 rotate-45 bg-[#2196F3] px-16 sm:px-32 py-2 sm:py-4 text-xs sm:text-base font-bold text-white shadow-lg before:absolute before:left-0 before:right-0 before:top-1 before:h-[1px] before:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)] after:absolute after:left-0 after:right-0 after:bottom-1 after:h-[1px] after:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)]">
          <div className="flex items-center gap-1 sm:gap-2">
            <svg className="h-6 w-6 sm:h-12 sm:w-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">Add to your project!</span>
            <span className="sm:hidden">GitHub</span>
          </div>
        </div>
        <div className="absolute -right-16 sm:-right-28 top-2 sm:top-3 rotate-45 bg-[#1976D2] px-16 sm:px-32 py-2 sm:py-4 text-xs sm:text-base font-bold text-white shadow-lg before:absolute before:left-0 before:right-0 before:top-1 before:h-[1px] before:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)] after:absolute after:left-0 after:right-0 after:bottom-1 after:h-[1px] after:bg-[repeating-linear-gradient(to_right,white_0px,white_4px,transparent_4px,transparent_8px)]">
          <div className="flex items-center gap-1 sm:gap-2">
            <svg className="h-6 w-6 sm:h-12 sm:w-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">Add to your project!</span>
            <span className="sm:hidden">GitHub</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};
