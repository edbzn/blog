const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { HashedModuleIdsPlugin } = require("webpack");
const common = require("./webpack.common.config");

module.exports = merge(common, {
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the HttpEffect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Codamit - Tech Blog",
      template: path.resolve(__dirname, "src", "client", "index.html"),
      minify: true,
      hash: true,
      chunksSortMode: "none",
    }),
    new Dotenv({
      path: "./.env.production",
    }),
    new HashedModuleIdsPlugin(),
  ],
});
