var path = require('path');
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var MultipageWebpackPlugin = require('multipage-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    new MultipageWebpackPlugin({
      bootstrapFilename: 'manifest',
      templateFilename: 'index.html',
      templatePath: '[name]',
      htmlTemplatePath: resolve('src/module/[name]/index.html'),
      htmlWebpackPluginOptions: {
          inject: true,
      }
    }),

    new FriendlyErrorsPlugin()
  ]
})

module.exports = webpackConfig