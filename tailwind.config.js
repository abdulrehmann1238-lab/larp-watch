/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F6F1',
          50: '#FDFCFB',
          100: '#F8F6F1',
          200: '#F1EEE7',
          300: '#E7E1D7',
          400: '#D8CCB8',
        },
        parchment: '#F1EEE7',
        stone: {
          light: '#E7E1D7',
          DEFAULT: '#D8CCB8',
          dark: '#A59B8B',
        },
        charcoal: {
          DEFAULT: '#24231F',
          light: '#55534D',
          dark: '#171715',
        },
        graphite: '#55534D',
        espresso: '#24221E',
        warmblack: '#171715',
        gold: {
          DEFAULT: '#A58A5B',
          light: '#C8B084',
          dark: '#876D40',
          subtle: '#EAE1CE',
        },
        sage: '#71816D',
        terracotta: '#A65E4D',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(36, 35, 31, 0.08)',
        'luxury-lg': '0 20px 40px -15px rgba(36, 35, 31, 0.12)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'luxury': '10px',
      }
    },
  },
  plugins: [],
}

