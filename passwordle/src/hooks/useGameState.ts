import { useState, useCallback } from "react";
import { validateGuess, getLetterStatus } from "../utils/gameLogic";

type GameStatus = "playing" | "won" | "lost";

interface GameState {
  guesses: string[];
  currentGuess: string;
  usedLetters: Record<string, "correct" | "present" | "absent">;
  gameStatus: GameStatus;
  handleKeyPress: (key: string) => void;
  resetGame: () => void;
}

export const useGameState = (targetPassword: string): GameState => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [usedLetters, setUsedLetters] = useState<Record<string, "correct" | "present" | "absent">>({});
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const updateUsedLetters = useCallback(
    (guess: string) => {
      const newUsedLetters = { ...usedLetters };
      guess.split("").forEach((letter, index) => {
        const status = getLetterStatus(letter, index, guess, targetPassword);
        if (!newUsedLetters[letter] || status === "correct") {
          newUsedLetters[letter] = status;
        }
      });
      setUsedLetters(newUsedLetters);
    },
    [targetPassword, usedLetters]
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      if (key === "ENTER") {
        if (currentGuess.length !== targetPassword.length) return;

        if (validateGuess(currentGuess, targetPassword)) {
          setGameStatus("won");
          updateUsedLetters(currentGuess);
          return;
        }

        setGuesses((prev) => [...prev, currentGuess]);
        updateUsedLetters(currentGuess);
        setCurrentGuess("");

        if (guesses.length + 1 >= 6) {
          setGameStatus("lost");
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < targetPassword.length) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    },
    [currentGuess, gameStatus, guesses.length, targetPassword, updateUsedLetters]
  );

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess("");
    setUsedLetters({});
    setGameStatus("playing");
  }, []);

  return {
    guesses,
    currentGuess,
    usedLetters,
    gameStatus,
    handleKeyPress,
    resetGame,
  };
};
