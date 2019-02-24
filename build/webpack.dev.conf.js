const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('./config')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')

const HOST = process.env.HOST || config.dev.host
const PORT = (process.env.PORT && Number(process.env.PORT)) || config.dev.port

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: utils.scssLoaders({
          sourceMap: config.dev.cssSourceMap
        })
      },
      {
        test: /\.css$/,
        use: utils.cssLoaders({
          sourceMap: config.dev.cssSourceMap
        })
      }
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    host: HOST,
    port: PORT,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    open: config.dev.autoOpenBrowser,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DIMIGOIN',
      env: process.env,
      template: 'index.html',
      filename: 'index.html',
      inject: true
    }),
    new FriendlyErrorPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${HOST}:${PORT}`]
      },
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined,
      clearConsole: true
    }),
    new DotenvPlugin({
      path: 'env/.dev.env',
      sample: 'env/.dev.env.example'
    })
  ]
})

module.exports = webpackConfig
