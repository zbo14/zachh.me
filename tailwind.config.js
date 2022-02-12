module.exports = {
  plugins: [
    require('tailwindcss-textshadow')
  ],

  purge: [
    './src/**/*.html',
    './src/**/*.vue'
  ],

  theme: {
    fontFamily: {
      custom: ['Inconsolata', 'sans-serif']
    },

    extend: {
      textShadow: {
        pink: '3px 3px 6px rgb(236 72 153 / 30%), 0 0 5px rgb(236 72 153 / 30%)'
      }
    }
  },

  variants: {}
}
