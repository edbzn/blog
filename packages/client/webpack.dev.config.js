const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.config');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = merge(common, {
  plugins: [
    new WebpackNotifierPlugin({
      title: 'Codamit',
      contentImage: path.resolve(__dirname, 'assets', 'images', 'icons', 'icon-96x96.png'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.dev.html'),
      chunksSortMode: 'none',
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: false,
  },
});
