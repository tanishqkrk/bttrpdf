/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        font: "#EFFFFB",
        base: "#181818",
        // base: "#EFFFFB",
        // font: "#272727",
        primary: "#50D890",
        secondary: "#4F98CA",
      },
    },
  },
  plugins: [],
};
