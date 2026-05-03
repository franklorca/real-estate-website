const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // --- 1. FONT FAMILY ---
      fontFamily: {
        serif: ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        sans: ["Outfit", ...defaultTheme.fontFamily.sans],
      },
      // --- 2. COLOR PALETTE ---
      colors: {
        "brand-dark": "#1a1a1a", // Deep, rich black instead of slate
        "brand-light": "#6b7280", // Softer gray
        "brand-accent": "#C5A059", // Muted Gold for luxury
        "brand-accent-hover": "#D4AF37", // Brighter Gold
        "brand-bg": "#FAFAFA", // Off-white luxury background
        "brand-divider": "#e5e7eb",
        "brand-champagne": "#F1E8D9",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
