import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // day-mode
        primary: colors.indigo[600],
        border: colors.gray[200],
        hover: colors.gray[100],
        'hover-primary': colors.indigo[700],
        'gray-text': colors.gray[500],
        'border-dark': colors.gray[300],

        // night-mode
        'night-primary': colors.indigo[400],
        'night-bg': '#16171B',
        'night-border': colors.gray[800],
        'night-nav': '#121316',
        'night-hover': '#1C1E22',
        'night-gray-text': colors.gray[300],

        // common
        black: '#121316',
        error: colors.rose[500],
      },
      gridTemplateColumns: {
        responsive: 'repeat(auto-fit, minmax(100px, 300px))',
      },
    },
  },
  plugins: [forms],
};
