export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        comfort: ['"Gotham Pro"', 'san-serif'],
        room: ['"Gotham Pro"', 'san-serif'],
        sans: ['Gotham Pro', 'sans-serif'],
      },
      flex: {
        '50': '1 1 20%',
        '100': '1 1 45%',
      },
    },
  },
  plugins: [],
};
