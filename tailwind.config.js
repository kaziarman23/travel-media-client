/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        dash: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-100" },
        },
      },
      animation: {
        dash: "dash 2s linear infinite",
      },
      colors: {
        BlackBg: "#1c232b",
        silver: "#9ca3b0",
        "light-silver": "#9ea4b2",
      },
    },
  },
  plugins: [require("daisyui")],
};
