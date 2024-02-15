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
        quinary: "#9c9c9c",
        button: "#151515",
        buttonHover: "#191919",
        background: "#080808",
      },
      borderRadius: {
        big: "30px",
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: 'translateY(-2px)' },
          to: { opacity: "1", transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: 'translateX(2px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: 'translateY(2px)' },
          to: { opacity: "1", transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: 'translateX(-2px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
        slideDown: {
          from: { height: "0" },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: "0" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: { opacity:"0", transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity:"1", transform: 'translate(-50%, -50%) scale(1)' },
        },
      } 
    },
  },
  plugins: [],
};
export default config;
