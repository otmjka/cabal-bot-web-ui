/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        pulseOnce: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.1' },
        },
      },
      animation: {
        'pulse-once': 'pulseOnce 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
