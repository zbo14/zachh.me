module.exports = {
  purge: [],

  theme: {
    fontFamily: {
      custom: ['Inconsolata', 'sans-serif']
    },

    extend: {
      textShadow: {
        custom: '3px 3px 6px rgb(236 72 153 / 30%), 0 0 5px rgb(236 72 153 / 30%)'
      }
    }
  },

  variants: {},

  plugins: [
    require('tailwindcss-textshadow')
  ]
}
