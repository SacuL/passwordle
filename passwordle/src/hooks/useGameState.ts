import { useState, useCallback } from "react";
import { validateGuess, getLetterStatus, PasswordWithTip } from "../utils/gameLogic";

type GameStatus = "playing" | "won" | "lost";

interface GameState {
  guesses: string[];
  currentGuess: string;
  usedLetters: Record<string, "correct" | "present" | "absent">;
  gameStatus: GameStatus;
  showHint: boolean;
  handleKeyPress: (key: string) => void;
  resetGame: () => void;
  toggleHint: () => void;
}

export const useGameState = (targetPassword: PasswordWithTip): GameState => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [usedLetters, setUsedLetters] = useState<Record<string, "correct" | "present" | "absent">>({});
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [showHint, setShowHint] = useState(false);

  const updateUsedLetters = useCallback(
    (guess: string) => {
      const newUsedLetters = { ...usedLetters };
      guess.split("").forEach((letter, index) => {
        const status = getLetterStatus(letter, index, guess, targetPassword.password);
        if (!newUsedLetters[letter] || status === "correct") {
          newUsedLetters[letter] = status;
        }
      });
      setUsedLetters(newUsedLetters);
    },
    [targetPassword.password, usedLetters]
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      if (key === "ENTER") {
        if (currentGuess.length !== targetPassword.password.length) return;

        setGuesses((prev) => [...prev, currentGuess]);
        updateUsedLetters(currentGuess);
        setCurrentGuess("");

        if (validateGuess(currentGuess, targetPassword.password)) {
          setGameStatus("won");
          return;
        }

        if (guesses.length + 1 >= 6) {
          setGameStatus("lost");
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < targetPassword.password.length) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    },
    [currentGuess, gameStatus, guesses.length, targetPassword.password, updateUsedLetters]
  );

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess("");
    setUsedLetters({});
    setGameStatus("playing");
    setShowHint(false);
  }, []);

  const toggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  return {
    guesses,
    currentGuess,
    usedLetters,
    gameStatus,
    showHint,
    handleKeyPress,
    resetGame,
    toggleHint,
  };
};
