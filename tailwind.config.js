/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#33A1E0",
        disabled: "#DDDDDD",
        normal: "#151515",
        error: "#E43636",
      },
      backgroundImage: {},
      borderRadius: {
        input: "8px",
      },
      minHeight: {
        screen: "100dvh",
      },
      fontSize: {
        label: "16px",
      },
      width: {},
      height: {
        input: "44px",
      },
      padding: {
        input: "0px 8px",
      },
      keyframes: {},
      animation: {},
      backgroundSize: {},
      screens: {
        sm: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        xxl: "1920px",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};

