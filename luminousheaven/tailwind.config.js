/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ["Outfit", 'sans-serif'],
      },
      colors: {
        "brand-dark": "#1a1a1a",
        "brand-light": "#6b7280",
        "brand-accent": "#C5A059",
        "brand-accent-hover": "#D4AF37",
        "brand-bg": "#FAFAFA",
        "brand-divider": "#e5e7eb",
        "brand-champagne": "#F1E8D9",
        "brand-text": "#1a1a1a",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
