const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  // entry: {
  //   app: './src/ts/main.ts',
  //   vendors: ['phaser']
  // },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new CopyWebpackPlugin({patterns: [
      {
        from: path.resolve(__dirname, 'src/index.html'),
        to: path.resolve(__dirname, 'dist/index.html')
      },
      {
        from: path.resolve(__dirname, 'assets'),
        to: path.resolve(__dirname, 'dist/assets')
      }
    ]}),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
  ],

  devtool: 'source-map',

  devServer: {
    static: path.resolve(__dirname, 'dist')
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
};
