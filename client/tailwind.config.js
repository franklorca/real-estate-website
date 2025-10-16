const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // --- 1. FONT FAMILY ---
      fontFamily: {
        serif: ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      // --- 2. COLOR PALETTE ---
      colors: {
        "brand-dark": "#1e293b",
        "brand-light": "#475569",
        "brand-accent": "#4f46e5",
        "brand-bg": "#f8fafc",
        "brand-divider": "#cbd5e1",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
