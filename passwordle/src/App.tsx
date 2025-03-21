import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "./components/LoginPage/LoginForm";
import { PasswordleGame } from "./components/PasswordleGame/PasswordleGame";
import "./App.css";

function App() {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {!showGame ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LoginForm onForgotPassword={() => setShowGame(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <PasswordleGame onBack={() => setShowGame(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
