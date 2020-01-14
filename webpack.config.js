const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const threadLoader = require('thread-loader');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');


const jsWorkerOptions = {
  workers: require('os').cpus().length - 1,
  workerParallelJobs: 50,
  poolTimeout: 2000,
  poolParallelJobs: 50,
  name: 'js-pool'
};
threadLoader.warmup(jsWorkerOptions, ['babel-loader']);


module.exports = {
  mode: process.env.NODE_ENV || "development",
  watch: false,
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'source-map',
  entry: {
    index: ['./web/src/scripts/index.js']
  },
  output: {
    path: path.join(__dirname, './web/assets'),
    publicPath: '/assets',
    filename: 'js/[name].js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./.dll/vendor-manifest.json')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new WriteFilePlugin(),
    function () {
      this.hooks.watchRun.tapAsync('MyWatchRunPlugin', (watching, callback) => {
        console.log('\033[36m' + 'Begin compile at ' + new Date() + ' \033[39m');
        callback();
      })
    },
    new ProgressBarPlugin({
      format: `  ${chalk.cyan.bold('build')} [:bar] ${chalk.green.bold(':percent')} | :msg (:elapsed seconds) `,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  grid: true,
                }),
                require('cssnano'),
                require('css-mqpacker'),
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader', options: jsWorkerOptions },
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: "usage",
                  corejs: 3
                }]
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'web'),
    port: 8080,
  },
};
