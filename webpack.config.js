var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'bootstrap': './node_modules/bootstrap/scss/bootstrap.scss',
    'styles': './src/assets/scss/styles.scss',
  },
  output: {
    path: path.join(__dirname, 'src/assets/themes'),
    filename: '[name].css'
  },
  module: {
    loaders: [
      {test: /\.(css|sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css"
    })
  ]
};