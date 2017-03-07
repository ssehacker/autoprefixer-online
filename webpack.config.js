'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

// var nodeExternals = require('webpack-node-externals');
//过滤node_modules中所有的模块
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

let webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');

let isDev = process.env.NEO_ENV === 'dev';

const BannerPlugin = webpack.BannerPlugin;
//webpack 插件
let plugins = [
  new ExtractTextPlugin(`[name].css`),
];
if (!isDev) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: !isDev,
    compress: {
      warnings: false
    }
  }));
}

module.exports = [
  {
    entry: ['babel-polyfill', './src/server.js'],
    output: {
      path: './dist',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeModules,
    devtool: 'source-map',
    plugins/*: plugins.concat(new BannerPlugin('require("source-map-support").install();', {raw: true, entryOnly: false}))*/,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0', 'react'],
          },
          exclude: /.*node_modules((?!localModule).)*$/,
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        /*{
         test: /\.css$/,
         loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
         },
         {
         test: /\.less$/,
         loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
         },*/
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
          ],
        }
      ]
    },
    resolve: {
      extensions: ["", ".js", ".json"]
    },
  },
  {
    entry: {
      index: './src/client',
    },
    output: {
      path: path.resolve(__dirname, 'dist', 'assets'),
      filename: `[name].js`,
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0', 'react'],
          },
          exclude: /.*node_modules((?!localModule).)*$/,
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
          ],
        }
      ],
    },
    postcss: [autoprefixer({browsers: ['ie > 9', 'last 2 versions']})],
    plugins,
    devtool: 'source-map',
    resolve: {
      extensions: ['', '.js', 'jsx', 'less'],
    },
    externals: {
      react: 'let React',
      'react-dom': 'let ReactDOM',
      'autoprefixer': 'let autoprefixer',
    },
  }];
