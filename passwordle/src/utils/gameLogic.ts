import { commonPasswordsWithTips } from "../data/commonPasswords";

export interface PasswordWithTip {
  password: string;
  tip: string;
}

export const selectRandomPassword = (): PasswordWithTip => {
  const randomIndex = Math.floor(Math.random() * commonPasswordsWithTips.length);
  return {
    ...commonPasswordsWithTips[randomIndex],
    password: commonPasswordsWithTips[randomIndex].password.toUpperCase(),
  };
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
