const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 3000
const DEBUG = process.env.NODE_ENV !== 'production'

const SitemapPlugin = require('sitemap-webpack-plugin');
const configfile = require('./config')

var paths = [
  {path:'/',priority: '0.7',changeFreq: 'daily'},
  {path:'/about',priority: '0.3'},
  {path:'/contact'},
  {path:'/signup'}
];


const config = {
  devtool: DEBUG ? 'eval' : false,
  entry: [
    path.join(__dirname, 'src')
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),// path.join(__dirname, 'dist'),
    filename: 'app.[hash].js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js'],
    alias: {
        'load-image': 'blueimp-load-image/js/load-image.js',
        'load-image-meta': 'blueimp-load-image/js/load-image-meta.js',
        'load-image-exif': 'blueimp-load-image/js/load-image-exif.js',
        'canvas-to-blob': 'blueimp-canvas-to-blob/js/canvas-to-blob.js',
        'jquery-ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      'config': JSON.stringify(configfile)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      config: configfile,
      template: path.join(__dirname, '/public/index.html')
    }),
    // new webpack.DefinePlugin({
    //   'config': JSON.stringify(configfile),
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new SitemapPlugin(configfile.FRONTURL, paths,{
      lastMod: true,
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/jpeg' },
      { test: /\.woff$/, loader: 'url?prefix=fonts/&limit=8000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file?prefix=fonts/' },
      { test: /\.eot$/, loader: 'file?prefix=fonts/' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: "style!css" },
      { test: require.resolve("blueimp-file-upload"),loader: "imports?define=>false" },
      { test: require.resolve("medium-editor-insert-plugin"),loader: "imports?define=>false" },
    ]
  }
}

if (DEBUG) {
  config.entry.unshift(
    `webpack-dev-server/client?http://${ip}:${port}/`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  )

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ])
}

module.exports = config
