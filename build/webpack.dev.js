const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const base = require('./webpack.base')
const { rootPath, localConfig, proxyConfig } = require('../config/base.env')

module.exports = merge(base, {
  target: 'web',
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  devServer: {
    hot: true,
    open: true,
    compress: true,
    host: localConfig.clientHost,
    port: localConfig.clientPort,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: [
      {
        context: ['/api', '/japi'],
        ...proxyConfig,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: rootPath('public/index.html'),
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    path: rootPath('dist'),
    publicPath: '/',
  },
})
