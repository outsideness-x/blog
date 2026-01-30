import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        background: "#09090b", // zinc-950
        foreground: "#e4e4e7", // zinc-200
        primary: "#22c55e", // green-500 (terminal vibe)
        border: "#27272a", // zinc-800
      },
      backgroundImage: {
        "scanlines": "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;