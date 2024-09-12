/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        BlackBg: "#1c232b",
        silver: "#9ca3b0",
        "light-silver": "#9ea4b2",
      },
    },
  },
  plugins: [require("daisyui")],
};
