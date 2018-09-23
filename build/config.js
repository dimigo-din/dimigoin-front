const path = require('path')
const merge = require('webpack-merge')

const baseConfig = {
  devtool: '',
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/'
}

module.exports = {
  dev: merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    cssSourceMap: true,

    // Dev Server
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxyTable: {} // for local api server
  }),

  build: merge(baseConfig, {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    productionSourceMap: true,
    devtool: 'source-map'
  })
}
