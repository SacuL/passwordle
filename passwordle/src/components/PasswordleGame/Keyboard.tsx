import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, "correct" | "present" | "absent">;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, usedLetters }) => {
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  const getKeyStyle = (key: string) => {
    const status = usedLetters[key.toUpperCase()];
    if (!status) return "bg-gray-200 hover:bg-gray-300";
    switch (status) {
      case "correct":
        return "bg-wordle-green text-white hover:bg-wordle-green/90";
      case "present":
        return "bg-wordle-yellow text-white hover:bg-wordle-yellow/90";
      case "absent":
        return "bg-wordle-dark text-white hover:bg-wordle-dark/90";
      default:
        return "bg-gray-200 hover:bg-gray-300";
    }
  };

  return (
    <div className="flex flex-col gap-1 sm:gap-2 px-1 sm:px-0">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1.5">
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              onClick={() => onKeyPress(key)}
              className={`h-10 sm:h-14 rounded-md px-2 sm:px-4 text-xs sm:text-sm font-bold uppercase transition-colors ${getKeyStyle(
                key
              )} ${key === "ENTER" ? "w-12 sm:w-20" : key === "BACKSPACE" ? "w-12 sm:w-20" : "w-8 sm:w-12"}`}
            >
              {key === "BACKSPACE" ? "←" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
