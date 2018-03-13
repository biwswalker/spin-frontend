var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var scriptLoader = require("script-loader");
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
module.exports = {
  entry: {
    'app': './src/assets/scss/app.scss',
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
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css"
    }),
  ]
};

// module.exports = {
//   context: __dirname,
//   entry: './src/assets/js/scripts.js',
//   output: {
//     path: path.join(__dirname, 'src/assets/themes'),
//     filename: 'scripts.min.js'
//   },
//    plugins: [
//     new ExtractTextPlugin({
//       filename: "scripts.min.js"
//     }),
//   ],
// };
