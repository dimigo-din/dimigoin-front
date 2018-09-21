const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: utils.scssLoaders({
          extract: true,
          sourceMap: config.dev.cssSourceMap
        })
      },
      {
        test: /\.css$/,
        use: utils.cssLoaders({
          extract: true,
          sourceMap: config.dev.cssSourceMap
        })
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: config.build.productionSourceMap && {
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        },
        styles: {
          name: 'styles',
          test: /\.(css|scss)$/,
          enforce: true
        },
        default: {
          name: 'default',
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new StylelintPlugin({
      files: ['**/*.css', '**/*.scss', '**/*.vue']
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[chunkhash].css'),
      chunkFilename: utils.assetsPath('css/[id].[chunkhash].css')
    }),
    new HtmlPlugin({
      title: 'DIMIGOIN',
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      chunksSortMode: 'dependency',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: true
    }),
    new DotenvPlugin({
      path: '.env',
      sample: 'example.env'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '..')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new OfflinePlugin({
      externals: ['/'],
      appShell: '/'
    })
  ]
})

module.exports = webpackConfig
