import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          black: "#111713",
          green: "#1F5B3A",
          leaf: "#3E8F5B",
          mint: "#EAF6EF",
          lime: "#B7E66E"
        },
        accent: {
          marigold: "#F4B942",
          terracotta: "#C96A4A",
          sky: "#D9ECF7",
          iris: "#4B73FF"
        },
        neutral: {
          ink: "#111111",
          charcoal: "#2A2D2A",
          slate: "#5D665F",
          stone: "#8C948D",
          cloud: "#F7F8F6",
          mist: "#EEF1ED",
          white: "#FFFFFF"
        },
        status: {
          success: "#2E7D4F",
          warning: "#D9901F",
          error: "#C2413A",
          info: "#3B6EDB",
          critical: "#8B1E1E"
        }
      },
      boxShadow: {
        glXs: "0 1px 2px rgba(17, 23, 19, 0.06)",
        glSm: "0 4px 12px rgba(17, 23, 19, 0.08)",
        glMd: "0 12px 32px rgba(17, 23, 19, 0.10)",
        glLg: "0 24px 64px rgba(17, 23, 19, 0.14)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      borderRadius: {
        gl: "8px"
      }
    }
  },
  plugins: []
};

export default config;
