export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        comfort: ['"Comfortaa"', 'san-serif'],
        room: ['"Room"', 'san-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      flex: {
        '50': '1 1 20%',
        '100': '1 1 45%',
      },
    },
  },
  plugins: [],
};
