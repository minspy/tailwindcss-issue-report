const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const base = require('./webpack.base')
const { rootPath } = require('../config/base.env')
const { getCdnPath, isAnalyaze } = require('../config/prod.env')

const publicPath = getCdnPath(process.env.BUILD_ENV)

let webpackProdConfig = merge(base, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      cacheGroups: {
        vue: {
          enforce: true,
          chunks: 'initial',
          test: /vue/,
          priority: 10,
          name: 'vue',
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          name: 'vendors',
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Use multi-process parallel running to improve the build speed. (Default: os.cpus().length - 1)
      }),
      new OptimizeCssAssetsPlugin({
        /**
         * part of CSSNANO optimisations
         * @see https://cssnano.co/guides/optimisations
         */
        cssProcessorOptions: {
          safe: true, // avoid CSSNANO rebases z-index values
          discardComments: {
            removeAll: true, // remove all comments
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: rootPath('public/index.html'),
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[contenthash:8].async.css',
    }),
  ],
  output: {
    clean: true,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[contenthash:8].async.js',
    publicPath,
  },
})

if (isAnalyaze) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
  const SMP = new SpeedMeasurePlugin({
    outputTarget: 'dist/speedReport.json',
  })
  webpackProdConfig.plugins.push(
    /**
     * Webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap
     */
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // start HTTP server
      statsFilename: 'bundleAnalyzeReport.json',
      generateStatsFile: true, // generate stats JSON file
    })
  )
  /* generate a JSON file containing webpack records */
  webpackProdConfig.recordsPath = rootPath('dist')
  webpackProdConfig = SMP.wrap(webpackProdConfig)
}

module.exports = exports = webpackProdConfig
