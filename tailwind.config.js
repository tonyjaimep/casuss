module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Rubik', 'ui-sans-serif', 'system-ui'],
      'serif': ['Playfair Display', 'ui-serif']
    },
    container: {
      center: true
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
