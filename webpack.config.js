module.exports = {
    module: {
      rules: [{
        test: /\.sass$/,
        use: [
          'postcss-loader',
          'sass-loader',
        ]
      }]
    }
  };