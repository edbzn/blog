const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/client/index",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss|sass$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist", "client"),
  },
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
};
