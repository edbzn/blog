const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');


module.exports = merge(common, {
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("./src/client/assets/images/icons/icon-96x96.png"),
      suppressSuccess: true
    }),
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
