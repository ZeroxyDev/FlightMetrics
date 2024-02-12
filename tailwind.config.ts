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
        'rainbow': 'linear-gradient(to right,#818cf8,#e0e7ff,#38bdf8,#e879f9,#38bdf8,#e0e7ff,#818cf8);',
        'plate': 'linear-gradient(to right,#e0e0e0,#b4b4b4,#e0e0e0,#7c7c7c,#b4b4b4,#e0e0e0)',
      },
      colors: {
        primary: "#ffffff",
        secondary: "#1e1e1e",
        tertiary: "#484848",
        quaternary: "#797979",
        button: "#151515",
        buttonHover: "#191919",
        background: "#080808",
      },
      borderRadius: {
        big: "30px",
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        }
      } 
    },
  },
  plugins: [],
};
export default config;
