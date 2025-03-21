import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";
import { Button } from "../common/Button";
import { useGameState } from "../../hooks/useGameState";
import { selectRandomPassword, PasswordWithTip } from "../../utils/gameLogic";

interface PasswordleGameProps {
  onBack: () => void;
}

export const PasswordleGame: React.FC<PasswordleGameProps> = ({ onBack }) => {
  const [targetPassword, setTargetPassword] = useState<PasswordWithTip>(selectRandomPassword());
  const [showConfetti, setShowConfetti] = useState(false);
  const { guesses, currentGuess, usedLetters, gameStatus, showHint, handleKeyPress, resetGame, toggleHint } =
    useGameState(targetPassword);

  useEffect(() => {
    if (gameStatus === "won") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [gameStatus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameStatus !== "playing") return;

      const key = event.key.toUpperCase();

      // Handle Enter key
      if (key === "ENTER") {
        handleKeyPress("ENTER");
      }
      // Handle Backspace key
      else if (key === "BACKSPACE") {
        handleKeyPress("BACKSPACE");
      }
      // Handle letter and number keys
      else if (/^[A-Z0-9]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStatus, handleKeyPress]);

  const handlePlayAgain = () => {
    setTargetPassword(selectRandomPassword());
    resetGame();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none"
          >
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
              gravity={0.3}
              wind={0.05}
              colors={["#538d4e", "#b59f3b", "#3a3a3c"]}
              opacity={0.8}
              tweenDuration={1000}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onBack}
        className="absolute top-4 left-4 text-[#2196F3] hover:text-[#1976D2] flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Login
      </motion.button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Passwordle</h1>
        <p className="mt-2 text-center text-gray-600">Guess YOUR password in {6 - guesses.length} tries</p>
      </div>

      <div className="mb-4">
        <GameBoard
          guesses={guesses}
          currentGuess={currentGuess}
          targetPassword={targetPassword.password}
          maxGuesses={6}
        />
      </div>

      <div className="h-12 mb-2 flex flex-col items-center justify-center">
        {gameStatus === "playing" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <Button
              onClick={toggleHint}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-4 py-1.5 rounded-lg text-sm"
            >
              {showHint ? "Hide Hint" : "Get a Hint"}
            </Button>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-center text-gray-700 italic text-sm"
              >
                {targetPassword.tip}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <div className="w-full max-w-2xl">
        <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} />
      </div>

      {gameStatus !== "playing" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
          <p className="text-xl font-semibold mb-4">
            {gameStatus === "won" ? "Congratulations! You won!" : "Game Over! The password was:"}
          </p>
          <p className="text-2xl font-bold mb-4">{targetPassword.password}</p>
          <Button onClick={handlePlayAgain} className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6 py-3 rounded-lg">
            Play Again
          </Button>
        </motion.div>
      )}
    </div>
  );
};
