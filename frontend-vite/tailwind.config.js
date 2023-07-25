/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // md: "768px",
      // lg: "1024px",
      md: "880px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      colors: {
        cstmO: "#ff6400",
        cstmB: "#157499",
        cstmBD: "#157499",
      },
    },
  },
  plugins: [],
};
