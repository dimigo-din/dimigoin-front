const path = require('path')

const baseConfig = {
  devtool: '',
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/'
}

module.exports = {
  dev: {
    ...baseConfig,
    devtool: 'cheap-module-eval-source-map',
    cssSourceMap: true,

    // Dev Server
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxyTable: {} // for local api server
  },

  build: {
    ...baseConfig,
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    assetsPublicPath: process.env.PUBLIC_PATH,
    productionSourceMap: true,
    devtool: 'source-map'
  }
}
