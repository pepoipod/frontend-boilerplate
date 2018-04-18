const path = require('path');

module.exports = {
  mode: 'production',
  entry: './web/src/scripts/index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  modules: false,
                  targets: { browsers: ['last 2 versions', 'safari >= 7'] },
                }],
              ],
            },
          },
        ],
      },
    ],
  }
};
