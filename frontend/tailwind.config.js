export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fce4ec',
          100: '#f8bbd0',
          200: '#f48fb1',
          300: '#f06292',
          400: '#ec407a',
          500: '#e91e63',  // Main VMP Villa Pink
          600: '#d81b60',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f',
        },
        vmp: {
          pink: '#FA5166',     // VMP Villa primary pink (from website)
          'pink-light': '#F06292',
          'pink-dark': '#C2185B',
          background: '#FFFFFF',
          text: '#1B2536',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
