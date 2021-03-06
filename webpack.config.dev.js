'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, './client/router.js'),
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    loaders: [{
      test: /(\.js$|\.jsx$)/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
      },
    }, {
      test: /\.json?$/,
      loader: 'json',
    }, 
    { 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file-loader" 
    }, {
       test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    },
    { test: /\.(png|jpg|jpeg)$/, loader: 'file' }],
  },
};