const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
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
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: "node_modules/@webcomponents/webcomponentsjs",
        to: "assets/js/webcomponentsjs",
      },
      {
        from: "node_modules/bulma/css/bulma.min.css",
        to: "assets/css/bulma.min.css",
      },
      {
        from: "node_modules/simplemde/src/css/simplemde.css",
        to: "assets/css/simplemde.css",
      },
      {
        from: "node_modules/simplemde/debug/simplemde.css",
        to: "assets/css/debug-simplemde.css",
      },
      {
        from: "src/client/assets",
        to: "assets",
      },
      {
        from: "src/client/favicon.ico",
      },
      {
        from: "src/client/robots.txt",
      },
      {
        from: "src/client/manifest.json",
      },
      {
        from: "src/client/sw.js",
      },
    ]),
  ],
  devServer: {
    historyApiFallback: true,
  },
});
