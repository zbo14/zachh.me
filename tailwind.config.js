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
        pink: '3px 3px 6px rgb(236 72 153 / 30%), 0 0 5px rgb(236 72 153 / 30%)',
        yellow: '3px 3px 6px rgb(253 230 138 / 90%), 0 0 5px rgb(253 230 138 / 90%)'
      }
    }
  },

  variants: {}
}
