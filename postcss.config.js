module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: () => {
        return [375 / 10]
      },
      propList: ['*'],
      minPixelValue: 2,
    },
  },
}
