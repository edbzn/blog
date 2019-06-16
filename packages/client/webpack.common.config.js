const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index'),
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.scss|sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist', 'client'),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
        to: 'assets/js/webcomponents-bundle.js',
        cache: true,
      },
      {
        from: 'node_modules/simplemde/src/css/simplemde.css',
        to: 'assets/css/simplemde.css',
        cache: true,
      },
      {
        from: 'node_modules/simplemde/debug/simplemde.css',
        to: 'assets/css/debug-simplemde.css',
        cache: true,
      },
      {
        from: 'src/assets',
        to: 'assets',
        cache: true,
      },
      {
        from: 'src/favicon.ico',
        cache: true,
      },
      {
        from: 'src/robots.txt',
        cache: true,
      },
      {
        from: 'src/manifest.json',
        cache: true,
      },
    ]),
  ],
};

// - Here is the babel loader conf
// - Commented since server side imports result in a compilation error
//
// {
//   test: /\.(ts|js)x?$/,
//   exclude: /node_modules/,
//   use: {
//     loader: 'babel-loader',
//     options: {
//       cacheDirectory: true,
//       babelrc: true,
//     }
//   }
// },
