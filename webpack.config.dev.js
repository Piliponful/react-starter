const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules\/(?!(project-x-ui)\/).*/,
    enforce: 'pre',
    use: [{
      loader: 'babel-loader',
      options: {
        plugins: [require.resolve('react-refresh/babel')]
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
    test: /\.(jpe?g|png|gif|ttf|ico)$/i,
    use: 'file-loader'
  },
  {
    test: /\.svg$/,
    use: [{ loader: '@svgr/webpack', options: { svgoConfig: { plugins: [{ cleanupIDs: false }] } } }]
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
    new ReactRefreshWebpackPlugin(),
    new webpack.EnvironmentPlugin(['API_URL'])
  ]
}
