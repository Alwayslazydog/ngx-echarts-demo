module.exports = () => ({
    plugins: [
      require('postcss-pxtorem')({
        rootValue: 0.0,
        propList: ['*']
      })
    ]
  })