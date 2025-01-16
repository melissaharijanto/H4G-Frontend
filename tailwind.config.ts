import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "off-white": "#FAFAFA",
        "white": "#FFFFFF",
        "blue": "#2C3691",
        "red": "#D2422A",
        "green": "#3B9983",
        "yellow": "#F3AB46",
        "grey": "#DDDDDD",
        "dark-grey": "#888888",
        "input": "#f2f2f2",
        "dark-green": "#005440",
        "light-green": "#41C8A8",
        "light-yellow": "#FBC983",
        "light-red": "#FA7E69",
      },
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      boxShadow: {
        "custom": "0 0 7px 0px rgba(0,0,0,0.25)",
      },
      padding: {
        '18': '4.5rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
