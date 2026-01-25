import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        foreground: "#0F172A",
        accent: "#D4AF37",
        "accent-dark": "#B8941F",
        "accent-light": "#F0E5C8",

        // brand + luxury palette for hero
        brandNavy: "#0E1A2B",
        luxury: {
          gold: "#D4AF37",
          darkGold: "#B8941F",
          lightGold: "#F0E5C8",
          navy: "#1E293B",
          slate: "#334155",
        },

        primary: {
          50: "#FAF9F5",
          100: "#F5F2E9",
          200: "#E8E1D0",
          300: "#D4C9B3",
          400: "#C0AF96",
          500: "#A89269",
          600: "#8B7552",
          700: "#6E5A3E",
          800: "#523F2B",
          900: "#3A2B1C",
        },
      },

      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #F0E5C8 100%)",
        "gradient-dark": "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      },

      boxShadow: {
        luxury: "0 4px 20px rgba(212, 175, 55, 0.15)",
        "luxury-lg": "0 10px 40px rgba(212, 175, 55, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
