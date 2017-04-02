const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './views/layout.html',
//   filename: 'layout.html',
//   inject: 'body'
// })

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(ROOT_PATH, 'app-www/src/index'),
  ],
  target: 'web',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'app-www/build'),
    publicPath: '/app-www/build',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app-www/build'),
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  plugins: [
    // HtmlWebpackPluginConfig
    new webpack.HotModuleReplacementPlugin()
  ]
};


