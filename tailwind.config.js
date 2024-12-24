/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customGray: "#6F767E",
        studentsGray: "#EEEEEE",
        rightGray: "#f6f8fa",
        searchGray: "#808291",
        redDot: '#FF4949',
        bodyGray: "#E9EDF1",
        bodyText: "#3F526E",
        tableGray: "#F6F8FA",
        tableGreen: "#4AEA40",
      },
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}