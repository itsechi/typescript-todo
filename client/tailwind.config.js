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
        'hover-primary': colors.indigo[700],
        'gray-50': colors.gray[50],
        'gray-100': colors.gray[100],
        'gray-300': colors.gray[300],

        // night-mode
        'night-primary': '#6359ff',
        'night-gray-200': '#202022',
        'night-gray-300': colors.gray[300],
        'night-gray-700': '#252527',
        'night-gray-900': '#19191a',
        'night-gray-950': '#0f0f10',

        // common
        black: '#121316',
        error: colors.rose[500],
      },
      gridTemplateColumns: {
        responsive: 'repeat(auto-fit, minmax(100px, 300px))',
      },
      animation: {
        loader: 'spin 1s infinite linear',
      },
      keyframes: {
        spin: {
          to: { tranform: 'rotate(1turn)' },
        },
      },
    },
  },
  plugins: [forms],
};
