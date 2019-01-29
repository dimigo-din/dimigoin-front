const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const config = require('./config')

const styleLoader = extract => extract ? {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../../'
  }
} : {
  loader: 'vue-style-loader'
}

exports.assetsPath = function (_path = '') {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options = {
  extract: false,
  sourceMap: true
}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      importLoaders: 1
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  return [
    styleLoader(options.extract),
    cssLoader,
    postcssLoader
  ]
}

exports.scssLoaders = function (options = {
  extract: false,
  sourceMap: true
}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      importLoaders: 2
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const scssLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: options.sourceMap,
      data: `
        @import '~styles/variables', '~styles/mixins';
      `
    }
  }

  return [
    styleLoader(options.extract),
    cssLoader,
    postcssLoader,
    scssLoader
  ]
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    notifier.notify({
      title: 'dimigoin-front',
      message: severity + ': ' + errors[0].name
    })
  }
}
