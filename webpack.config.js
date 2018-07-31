const path = require('path');
const threadLoader = require('thread-loader');
const webpack = require('webpack');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


const jsWorkerOptions = {
  workers: require('os').cpus().length - 1,
  workerParallelJobs: 50,
  poolTimeout: 2000,
  poolParallelJobs: 50,
  name: 'js-pool'
};
threadLoader.warmup(jsWorkerOptions, ['babel-loader']);


module.exports = {
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'source-map',
  entry: {
    index: ['babel-polyfill', './web/src/scripts/common.js']
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./.dll/vendor-manifest.json')
    }),
    function () {
      this.hooks.watchRun.tapAsync('MyWatchRunPlugin', (watching, callback) => {
        console.log('\033[36m' + 'Begin compile at ' + new Date() + ' \033[39m')
        callback()
      })
    },
    new ProgressBarPlugin({
      format: `  ${chalk.cyan.bold('build')} [:bar] ${chalk.green.bold(':percent')} | :msg (:elapsed seconds) `,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {loader: 'cache-loader'},
          {loader: 'thread-loader', options: jsWorkerOptions},
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {browsers: ['last 2 versions', 'safari >= 7']}
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
};
