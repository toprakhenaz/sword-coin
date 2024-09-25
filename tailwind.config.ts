import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        riseAndFade: 'riseAndFade 2s ease-out forwards',  // Animasyon ekledik
      },
      keyframes: {
        riseAndFade: {
          '0%': { opacity: '1', transform: 'translate(-50%, -50%) translateY(0)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -50%) translateY(-100px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
