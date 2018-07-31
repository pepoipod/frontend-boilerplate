const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'jquery',
    ]
  },
  output: {
    path: path.join(__dirname, './web/assets/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.dll', '[name]-manifest.json'),
      name: '[name]_library'
    }),
  ]
};
