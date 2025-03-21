/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "wordle-green": "#538d4e",
        "wordle-yellow": "#b59f3b",
        "wordle-dark": "#3a3a3c",
        "wordle-light": "#818384",
      },
      animation: {
        flip: "flip 0.5s ease-in-out",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0)" },
          "100%": { transform: "rotateX(180deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
};
