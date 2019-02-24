const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "Codamit [WDS] - [HMR]",
      template: path.resolve(__dirname, "src", "client", "index.dev.html"),
    }),
    new Dotenv({
      path: './.env'
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
});
