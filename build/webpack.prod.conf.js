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
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SentryCli = require('@sentry/cli')
const SentryCliPlugin = require('@sentry/webpack-plugin')

const webpackConfig = async () => {
  const sentryProposedVersion = await (new SentryCli(path.resolve(__dirname, '../.sentryclirc'))).releases.proposeVersion()

  return merge(baseWebpackConfig, {
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
            sourceMap: config.build.productionSourceMap
          })
        },
        {
          test: /\.css$/,
          use: utils.cssLoaders({
            extract: true,
            sourceMap: config.build.productionSourceMap
          })
        }
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          sourceMap: true
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
        name: false,
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            minChunks: 2
          }
        }
      }
    },
    plugins: [
      new HtmlPlugin({
        title: 'DIMIGOIN',
        template: 'index.html',
        filename: 'index.html',
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
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: ['fonts']
      }),
      ...(process.env.CI
        ? [new SentryCliPlugin({
          include: '.',
          ignoreFile: '.gitignore',
          configFile: '.sentryclirc',
          release: sentryProposedVersion
        })]
        : [new BundleAnalyzerPlugin()]
      ),
      new StylelintPlugin({
        files: ['**/*.css', '**/*.scss', '**/*.vue']
      }),
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[chunkhash].css'),
        chunkFilename: utils.assetsPath('css/[id].[chunkhash].css')
      }),
      new DotenvPlugin({
        path: 'env/.prod.env',
        sample: 'env/.env.example'
      }),
      new webpack.EnvironmentPlugin({
        SENTRY_PROPOSED_VERSION: sentryProposedVersion
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin('dist', {
        root: path.resolve(__dirname, '..')
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
    ]
  })
}

module.exports = webpackConfig
