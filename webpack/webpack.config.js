// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
const devServer = require('@webpack-blocks/dev-server2')
const splitVendor = require('webpack-blocks-split-vendor')
const happypack = require('webpack-blocks-happypack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools-configuration')
const configfile = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const {
  addPlugins, createConfig, entryPoint, env, setOutput,
  sourceMaps, defineConstants, webpack,
} = require('@webpack-blocks/webpack2')

const host = process.env.HOST || 'localhost'
const ip = process.env.IP || '0.0.0.0'
//const port = process.env.PORT || 3000
const port = (+process.env.PORT + 1) || 3001
const sourceDir = process.env.SOURCE || 'src'
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const isDebug = process.env.NODE_ENV !== 'production'
//const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist')

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
})

const assets = () => () => ({
  module: {
    rules: [
      { test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/, loader: 'url-loader?limit=8000' },
      { test: /\.css/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
    ],
  },
})

const resolveModules = modules => () => ({
  resolve: {
    modules: [].concat(modules, ['node_modules']),
  },
})

const config = createConfig([
  entryPoint({
    app: path.join(process.cwd(), sourceDir, 'client') //sourcePath,
  }),
  setOutput({
    filename: '[name].[hash].js',
    path: outputPath,
    publicPath: isDebug ? `http://${ip}:${port}/` : publicPath,
    //publicPath,
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.PUBLIC_PATH': publicPath.replace(/\/$/, ''),
  }),
  // addPlugins([
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: path.join(process.cwd(), 'public/index.html'),
  //   }),
  // ]),
  addPlugins([
    new webpack.ProgressPlugin(),
    new ExtractTextPlugin({ filename: '[name].[hash].css', disable: false, allChunks: true }),
  ]),
  happypack([
    babel(),
  ]),
  assets(),
  resolveModules(sourceDir),

  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: publicPath },
      headers: { 'Access-Control-Allow-Origin': '*' },
      host:ip,
      port,
    }),
    sourceMaps(),
    addPlugins([
      new webpack.NamedModulesPlugin(),
      new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),
    ]),
  ]),

  env('production', [
    splitVendor(),
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),
    ]),
  ]),
])

module.exports = config
