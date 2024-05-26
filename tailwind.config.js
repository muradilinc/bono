export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '128': '32rem', // 8 часов (4 * 2rem/час)
      },
    },
  },
  plugins: [],
};
