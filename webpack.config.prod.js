const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const config = require('config')

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    enforce: 'pre',
    use: ['babel-loader', {
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
    test: /\.(jpe?g|png|gif|svg|ttf)$/i,
    use: 'file-loader'
  }
]

module.exports = {
  entry: [
    `${srcDir}/index.js`
  ],
  output: {
    path: distDir,
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new CopyWebpackPlugin([
      // { from: 'src/app/images/favicon.ico', to: distDir }
    ]),
    new webpack.DefinePlugin({
      'CONFIG': JSON.stringify(config)
    })
  ]
}
