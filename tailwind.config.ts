import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed-variant": "#5d4201",
        "surface-container-low": "#f3f4f5",
        "on-secondary-container": "#785a1a",
        "on-error": "#ffffff",
        "surface-container": "#edeeef",
        "inverse-surface": "#2e3132",
        "error": "#ba1a1a",
        "on-surface": "#191c1d",
        "surface-tint": "#5f5e5e",
        "surface": "#f8f9fa",
        "outline": "#747878",
        "surface-dim": "#d9dadb",
        "on-surface-variant": "#444748",
        "inverse-primary": "#c8c6c5",
        "background": "#f8f9fa",
        "outline-variant": "#c4c7c7",
        "secondary": "#775a19",
        "secondary-container": "#fed488",
        "on-secondary-fixed": "#261900",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e7e8e9",
        "on-tertiary-fixed-variant": "#3f484f",
        "primary": "#000000",
        "surface-variant": "#e1e3e4",
        "tertiary-container": "#141d23",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#141d23",
        "primary-fixed-dim": "#c8c6c5",
        "surface-bright": "#f8f9fa",
        "primary-container": "#1c1b1b",
        "error-container": "#ffdad6",
        "on-primary-container": "#858383",
        "on-secondary": "#ffffff",
        "inverse-on-surface": "#f0f1f2",
        "on-primary-fixed-variant": "#474746",
        "tertiary": "#000000",
        "on-error-container": "#93000a",
        "primary-fixed": "#e5e2e1",
        "on-primary-fixed": "#1c1b1b",
        "secondary-fixed": "#ffdea5",
        "tertiary-fixed-dim": "#bfc8d0",
        "on-background": "#191c1d",
        "surface-container-highest": "#e1e3e4",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#7c858d",
        "secondary-fixed-dim": "#e9c176",
        "tertiary-fixed": "#dbe4ed"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "80px",
        "stack-md": "16px",
        "stack-sm": "8px",
        "margin-mobile": "20px",
        "container-max": "1440px",
        "gutter": "24px",
        "section-gap": "120px",
        "stack-lg": "32px"
      },
      fontFamily: {
        "display-lg": ["var(--font-space-grotesk)"],
        "label-md": ["var(--font-inter)"],
        "body-md": ["var(--font-inter)"],
        "headline-md": ["var(--font-space-grotesk)"],
        "headline-lg": ["var(--font-space-grotesk)"],
        "headline-lg-mobile": ["var(--font-space-grotesk)"],
        "headline-sm": ["var(--font-space-grotesk)"],
        "body-lg": ["var(--font-inter)"]
      },
      fontSize: {
        "display-lg": ["72px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "label-md": ["14px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "500" }],
        "headline-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["36px", { lineHeight: "1.2", fontWeight: "600" }],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }]
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        }
      },
      animation: {
        blob: "blob 7s infinite",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ],
};
export default config;
