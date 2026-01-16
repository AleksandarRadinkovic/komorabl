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
        primary: {
          DEFAULT: '#003DA5',
          dark: '#002D7A',
          light: '#1A5BC4',
        },
        secondary: {
          DEFAULT: '#C8102E',
          dark: '#A00D25',
          light: '#E01E3D',
        },
        accent: '#FFD100',
        neutral: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          800: '#343A40',
          900: '#212529',
        }
      },
    },
  },
  plugins: [],
};

export default config;
