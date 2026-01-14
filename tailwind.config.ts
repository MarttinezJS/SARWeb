import { heroui } from "@heroui/theme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,html}",
    "./node_modules/@heroui/theme/dist/components/button.js",
    "./node_modules/@heroui/theme/dist/components/slider.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
