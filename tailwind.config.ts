import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'button': '#00494d',
      'button-text': '#ffffff',
      'body': '#c5e4e7',
      'container': '#ffffff',
      'header': '#5e7a7d',
      'input': '#f4fafa',
      'inputText': '#00494d',
      'inputPlaceholder': '#9EBBBD',
      'invis': 'transparent',
      'amount': '#26c0ab',
      'warning': '#EF4444',
    }
  },
  plugins: [],
};
export default config;
