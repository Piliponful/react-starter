const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const config = require('config')

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    enforce: 'pre',
    use: [{
      loader: 'babel-loader',
      options: {
        plugins: [
          'react-refresh/babel'
        ]
      }
    }, {
      loader: 'standard-loader',
      options: {
        snazzy: true,
        error: true
      }
    }]
  },
  {
    test: /\.styl$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          camelCase: true,
          localIdentName: '[name]__[local]__[hash:base64:6]'
        }
      },
      'resolve-url-loader',
      'stylus-loader'
    ]
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'resolve-url-loader'
    ]
  },
  {
    test: /\.(jpe?g|png|gif|svg|ttf|ico)$/i,
    use: 'file-loader'
  }
]

module.exports = {
  entry: `${srcDir}/index.js`,
  output: {
    path: distDir,
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  },
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    // new CopyWebpackPlugin([
    //   { from: 'src/assets/images/favicon.ico', to: distDir }
    // ]),
    new webpack.DefinePlugin({
      'CONFIG': JSON.stringify(config)
    }),
    new ReactRefreshWebpackPlugin()
  ]
}
