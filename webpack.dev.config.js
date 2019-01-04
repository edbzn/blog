const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  plugins: [
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
