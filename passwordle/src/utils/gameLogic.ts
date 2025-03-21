import { commonPasswords } from "../data/commonPasswords";

export const selectRandomPassword = (): string => {
  const randomIndex = Math.floor(Math.random() * commonPasswords.length);
  return commonPasswords[randomIndex].toUpperCase();
};

export const validateGuess = (guess: string, targetPassword: string): boolean => {
  return guess === targetPassword;
};

export const getLetterStatus = (
  letter: string,
  index: number,
  guess: string,
  targetPassword: string
): "correct" | "present" | "absent" => {
  if (letter === targetPassword[index]) return "correct";
  if (targetPassword.includes(letter)) return "present";
  return "absent";
};
