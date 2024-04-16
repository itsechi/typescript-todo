import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": colors.indigo[600],
        "night-primary": colors.indigo[400],
        "night-bg": colors.gray[600],
        "black": colors.gray[900],
        "gray-dark": colors.gray[700],
        "gray-medium": colors.gray[500],
        "gray-light": colors.gray[300],
        "hover-light": colors.gray[100],
        "night-hover-light": colors.gray[800],
      },
    },
  },
  plugins: [],
};
