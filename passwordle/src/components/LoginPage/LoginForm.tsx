import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { GitHubRibbon } from "../common/GitHubRibbon";

interface LoginFormProps {
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    const interval = setInterval(() => {
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 1000); // Highlight for 1 second
    }, 2000); // Every 2 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);
    // Clear error after 3 seconds
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <GitHubRibbon />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 text-center max-w-2xl px-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Tired of boring password recovery?</h2>
        <p className="text-[#2196F3] text-lg font-medium">
          Try Passwordle - Where guessing your password is actually fun!
        </p>
      </motion.div>
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Passwordle</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            fullWidth
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            fullWidth
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            Log In
          </Button>
          <div className="relative">
            <motion.button
              type="button"
              onClick={onForgotPassword}
              className={`text-sm hover:text-[#1976D2] ${
                isHighlighted ? "text-[#2196F3] font-semibold" : "text-[#2196F3]"
              }`}
              animate={isHighlighted ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              Forgot your password?
            </motion.button>
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-[#2196F3] px-4 py-2 rounded-lg text-sm font-bold shadow-lg border-2 border-[#2196F3]"
                >
                  Try me!
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-[#2196F3] rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="h-8 flex items-center justify-center">
            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-500 text-sm text-center font-medium"
                >
                  Invalid credentials. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
};
