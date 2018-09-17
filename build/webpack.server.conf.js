'use strict'

const merge = require('webpack-merge');
const path = require('path');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');


const serverWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    path: config.build.assetsRoot,
    // filename: utils.assetsPath('js/server-entry.js'),
    filename: 'server-entry.js',
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    libraryTarget: 'commonjs2'
  },
  // 去除依赖，不打包到生成的文件中
  // 打包出来的代码是运行在node环境中的，这些类库是可以通过require()方式调用的
  externals: Object.keys(require('../package.json').dependencies),
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  // },
  devtool: config.dev.devtool,
});

module.exports = serverWebpackConfig;
