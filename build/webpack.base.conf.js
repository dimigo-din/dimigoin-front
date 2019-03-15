const path = require('path')
require('dotenv-safe').config({
  example: 'env/.webpack.env.example',
  path: 'env/.webpack.env',
  allowEmptyValues: true
})

const utils = require('./utils')
const config = require('./config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

function resolve (dir = '') {
  return path.resolve(__dirname, '..', dir)
}

const webpackConfig = {
  context: resolve(),
  entry: {
    app: path.resolve(resolve('app'), 'app.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      ...require('../alias.config.js').webpack
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            [process.env.NODE_ENV === 'production' ? 'emitError' : 'emitWarning']: true
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('app')],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              whitespace: 'condense' // This option will affect after vue version 2.6 >=
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: 'vue-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { removeDoctype: true },
                  { removeComments: true }
                ]
              }
            }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new StylelintPlugin({
      files: ['**/*.css', '**/*.scss', '**/*.vue'],
      emitErrors: process.env.NODE_ENV === 'production'
    })
  ]
}

module.exports = webpackConfig
