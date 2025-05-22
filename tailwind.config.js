/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFBE25",
        secondary: "#826754",
        "yellow-background": "#F1E5BF",
        background: "#FFF1D7",
        "whatsapp-color": "#25d366",
      },
      height: {
        "screen-with-navbar": "calc(100vh - 64px)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
    }),
  ],
};
