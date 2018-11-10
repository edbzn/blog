const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
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
  optimization: {
    minimizer: [],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Codamit",
      template: path.resolve(__dirname, "src", "client", "index.html"),
      minify: true,
      hash: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        API_BASE_URL: JSON.stringify("https://api.codamit.com"),
        STATIC_BASE_URL: JSON.stringify("https://static.codamit.com"),
        SENTRY_DSN: JSON.stringify(
          "https://47dc0f3309cb456b874afc36d3df16aa@sentry.io/1316181",
        ),
      },
    }),
  ],
});
