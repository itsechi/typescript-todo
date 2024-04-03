import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": colors.indigo[600],
        "light": colors.gray[100],
        "gray-medium": colors.gray[500],
        "gray-dark": colors.gray[800],
      },
    },
  },
  plugins: [],
};
