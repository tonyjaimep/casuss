module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
      'serif': ['Playfair Display', 'ui-serif']
    },
    container: {
      center: true,
      padding: '2rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
