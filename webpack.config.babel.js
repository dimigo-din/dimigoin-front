import path from 'path'

import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import DotenvPlugin from 'webpack-dotenv-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'

const production = process.env.NODE_ENV === 'production'

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
]

const cssExtract = ExtractTextPlugin.extract({
  use: cssLoaders,
  fallback: 'vue-style-loader'
})

const scssExtract = ExtractTextPlugin.extract({
  use: cssLoaders.concat({
    loader: 'sass-loader'
  }, {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        './app/scss/_variables.scss',
        './app/scss/_mixins.scss'
      ]
    }
  }),
  fallback: 'vue-style-loader'
})

const webpackConfig = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js'
  },
  plugins: [
    new DotenvPlugin({
      path: './.env',
      sample: './example.env'
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: !production
    }),
    new HtmlPlugin({
      title: 'DIMIGOIN',
      template: 'app/app.html',
      filename: 'index.html',
      minify: production && {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: production
    }),
    new StylelintPlugin({
      files: ['**/*.scss', '**/*.vue']
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: scssExtract
      },
      {
        test: /\.css$/,
        loader: cssExtract
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': scssExtract,
            'css': cssLoaders,
            'js': {
              loader: 'babel-loader',
              exclude: '/node_modules/'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ttf|woff2?|eot)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { removeViewBox: false }
            ]
          }
        }
      }
    ]
  },
  performance: { hints: false },
  resolve: { alias: { vue$: 'vue/dist/vue.esm.js' } },

  devtool: '#inline-source-map',
  devServer: {
    hot: true,
    compress: true,
    port: 8888,
    host: '0.0.0.0',
    historyApiFallback: true
  },

  node: { fs: 'empty' }
}

if (production) {
  webpackConfig.devtool = '#source-map'
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      mangle: true,
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  ])
}

export default webpackConfig
