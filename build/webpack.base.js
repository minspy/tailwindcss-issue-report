const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { rootPath } = require('../config/base.env')

const isDev = process.env.NODE_ENV === 'development'

const webpackBaseConfig = {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
    modules: [rootPath('src'), 'node_modules'],
    extensions: ['.vue', '.js'],
    alias: {
      '@': rootPath('src'),
      vue$: 'vue/dist/vue.esm.js',
      images: rootPath('src/assets/images'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  /**
                   * Specifies a custom public path for the target file(s)
                   * I don't know why default request is './styles/' and i need out styles folder and in images folder
                   */
                  publicPath: '../',
                },
              },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'field-placeholder-text-color': '#A2A0A8',
                  'password-input-height': '66px',
                  'password-input-margin': '0',
                  'password-input-font-size': '32px',
                  'password-input-border-radius': '16px',
                  'password-input-background-color': '#F9F9FA',
                  'tab-text-color': '#52525C',
                  'tab-active-text-color': '#4263EB',
                  'tab-font-size': '14px',
                  'tab-line-height': '26px',
                  'tabs-bottom-bar-color': '#4263EB',
                  'tabs-line-height': '44.5px',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        include: rootPath('src'),
        use: ['babel-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              /* Images larger than 10 KB won’t be inlined */
              limit: 10 * 1024,
              name: isDev ? '[path][name].[hash].[ext]' : '[path][name].[contenthash].[ext]',
              /* Specifies a custom file context */
              context: 'src/assets/images',
              /* Specify a filesystem path where the target file(s) will be placed */
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff|eot|ttf|otf|woff2|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        MOCK_ENV: JSON.stringify(process.env.MOCK),
        PROXY_ENV: JSON.stringify(process.env.PROXY),
        REMOTE_ENV: JSON.stringify(process.env.REMOTE),
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      },
      'process.client': true,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}

module.exports = exports = webpackBaseConfig
