const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const devConfig = require("./webpack.config");

module.exports = merge(devConfig, {
  mode: "production",
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Codamit - Tech Blog",
      template: path.resolve(__dirname, "src", "client", "index.html"),
      minify: true,
      hash: true,
    }),
    new Dotenv({
      path: './.env.production'
    }),
  ],
});
