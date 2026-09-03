/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0',
        ink: '#1B1F3B',
        ink2: '#3A3F63',
        gold: '#B8892B',
        goldLight: '#EFE1C3',
        moss: '#2F6F4F',
        mossLight: '#E1EEE6',
        line: '#E3DFD3',
        clay: '#B4532A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,31,59,0.06), 0 8px 24px -12px rgba(27,31,59,0.18)',
      },
    },
  },
  plugins: [],
};
