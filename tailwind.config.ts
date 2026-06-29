import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: "#0A0A0F",
        surface: "#111118",
        border: "#1E1E2E",
        muted: "#7C7C94",
        body: "#C8C8D8",
        white: "#F0F0F8",
        accent: "#8B5CF6",
        "accent-dim": "rgba(139, 92, 246, 0.08)",
        "accent-glow": "rgba(139, 92, 246, 0.15)",
        error: "#F87171",
      },
      maxWidth: {
        content: "1100px",
      },
      spacing: {
        "section-gap": "140px",
      },
      borderRadius: {
        card: "12px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
