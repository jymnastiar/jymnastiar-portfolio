/**
 * tailwind.config.ts
 *
 * NOTE: This project uses Tailwind CSS v4 with @tailwindcss/vite.
 * In v4, design tokens (colors, fonts, spacing) are defined in CSS via @theme
 * rather than in this JS config file.
 *
 * This file exists for IDE autocomplete and any v4-supported JS config options
 * (custom plugins, safelist, content paths if needed).
 *
 * The actual font families are declared in src/index.css under @theme:
 *   --font-syne, --font-sans, --font-mono
 * which map to the Tailwind utilities: font-syne, font-sans, font-mono
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
