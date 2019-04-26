const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = merge(common, {
  plugins: [
    new WebpackNotifierPlugin({
      title: 'Codamit',
      contentImage: path.resolve(
        __dirname,
        'src',
        ' client',
        'assets',
        'images',
        'icons',
        'icon-96x96.png'
      ),
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
      analyzerPort: 8082,
    }),
    new HtmlWebpackPlugin({
      title: 'Codamit [WDS] - [HMR]',
      template: path.resolve(__dirname, 'src', 'client', 'index.dev.html'),
      chunksSortMode: 'none',
    }),
    new Dotenv({
      path: './.env',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
});
