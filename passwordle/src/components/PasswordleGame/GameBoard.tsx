import React from "react";
import { motion } from "framer-motion";
import { GitHubRibbon } from "../common/GitHubRibbon";

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  targetPassword: string;
  maxGuesses: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ guesses, currentGuess, targetPassword, maxGuesses }) => {
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  const getLetterStatus = (letter: string, index: number) => {
    if (!letter) return "";
    if (letter === targetPassword[index]) return "bg-wordle-green";
    if (targetPassword.includes(letter)) return "bg-wordle-yellow";
    return "bg-wordle-dark";
  };

  const renderRow = (guess: string, rowIndex: number) => {
    console.log("rendering row", guess, rowIndex);
    const letters = guess.split("");
    const isCurrentGuess = rowIndex === guesses.length;

    return (
      <div key={`row-${rowIndex}`} className="flex gap-2">
        {Array.from({ length: targetPassword.length }).map((_, colIndex) => {
          const letter = isCurrentGuess ? letters[colIndex] || "" : letters[colIndex] || "";
          const status = isCurrentGuess ? "" : getLetterStatus(letter, colIndex);

          return (
            <motion.div
              key={`cell-${rowIndex}-${colIndex}`}
              className={`flex h-14 w-14 items-center justify-center border-2 ${
                isCurrentGuess ? "border-gray-400" : "border-gray-300"
              } text-2xl font-bold uppercase ${isCurrentGuess ? "text-gray-900" : "text-white"} ${status}`}
            >
              {letter}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-2">
      <GitHubRibbon />
      {/* Debug: Show target password only on localhost */}
      {isLocalhost && (
        <div className="mb-4 text-center text-sm text-gray-400">Debug: Target Password: {targetPassword}</div>
      )}
      {Array.from({ length: maxGuesses }).map((_, index) => {
        const guess = index < guesses.length ? guesses[index] : index === guesses.length ? currentGuess : "";
        return renderRow(guess, index);
      })}
    </div>
  );
};
