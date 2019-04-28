const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'client', 'index'),
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
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
    new WriteFilePlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
          to: 'assets/js/webcomponents-bundle.js',
          cache: true,
        },
        {
          from: 'node_modules/bulma/css/bulma.css',
          to: 'assets/css/bulma.css',
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
          from: 'src/client/assets',
          to: 'assets',
          cache: true,
        },
        {
          from: 'src/client/favicon.ico',
          cache: true,
        },
        {
          from: 'src/client/robots.txt',
          cache: true,
        },
        {
          from: 'src/client/manifest.json',
          cache: true,
        },
      ],
    ),
  ],
};
