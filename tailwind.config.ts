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
        border: "#c4c7c7", // outline-variant
        input: "#edeeef", // surface-container
        ring: "#775a19", // secondary
        background: "#f8f9fa",
        foreground: "#191c1d",
        primary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#775a19",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f5", // surface-container-low
          foreground: "#444748", // on-surface-variant
        },
        accent: {
          DEFAULT: "#fed488", // secondary-container
          foreground: "#785a1a", // on-secondary-container
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#191c1d",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#191c1d",
        },
        surface: "#f8f9fa",
        "surface-dim": "#d9dadb",
        "surface-bright": "#f8f9fa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "on-surface": "#191c1d",
        "on-surface-variant": "#444748",
        "inverse-surface": "#2e3132",
        "inverse-on-surface": "#f0f1f2",
        outline: "#747878",
        "outline-variant": "#c4c7c7",
        "surface-tint": "#5f5e5e",
        "primary-container": "#1c1b1b",
        "on-primary-container": "#858383",
        "inverse-primary": "#c8c6c5",
        "secondary-container": "#fed488",
        "on-secondary-container": "#785a1a",
        tertiary: "#000000",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#141d23",
        "on-tertiary-container": "#7c858d",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "primary-fixed": "#e5e2e1",
        "primary-fixed-dim": "#c8c6c5",
        "on-primary-fixed": "#1c1b1b",
        "on-primary-fixed-variant": "#474746",
        "secondary-fixed": "#ffdea5",
        "secondary-fixed-dim": "#e9c176",
        "on-secondary-fixed": "#261900",
        "on-secondary-fixed-variant": "#5d4201",
        "tertiary-fixed": "#dbe4ed",
        "tertiary-fixed-dim": "#bfc8d0",
        "on-tertiary-fixed": "#141d23",
        "on-tertiary-fixed-variant": "#3f484f",
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px'
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
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "0.1",
          },
          "50%": {
            opacity: "0.3",
          },
        },
      },
      animation: {
        blob: "blob 7s infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0) * .2s) infinite",
        "bounce-slow": "bounce-slow 3s infinite",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ],
};
export default config;
