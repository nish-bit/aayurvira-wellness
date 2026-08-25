import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F5F1E6",
        parchment2: "#EFE9D8",
        ink: "#22281F",
        forest: {
          DEFAULT: "#2F4A3C",
          dark: "#1E3126",
          light: "#456352"
        },
        sandal: {
          DEFAULT: "#A8763E",
          light: "#C79A5F",
          dark: "#7C5629"
        },
        earth: "#6B4226",
        mist: "#DCD5C1"
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"]
      },
      borderRadius: {
        card: "0.9rem"
      },
      boxShadow: {
        soft: "0 12px 40px -18px rgba(34, 40, 31, 0.35)"
      },
      backgroundImage: {
        "leaf-vein": "url(\"/images/leaf-vein.svg\")"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out both",
        fadeIn: "fadeIn 0.5s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
