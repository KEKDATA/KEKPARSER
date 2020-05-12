const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
  },
  entry: ['./src/app.tsx'],
  output: {
    filename: 'frontassets/js/app-min.js',
    path: path.join(__dirname, '../build/client'),
    chunkFilename: 'frontassets/js/[name].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader', 'cache-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=frontassets/images/[name].[ext]'],
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/i,
        use: ['file-loader?name=./frontassets/fonts/[name].[ext]'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        ignore: [
          {
            dot: true,
            glob: 'sass/**/*',
          },
        ],
        to: './frontassets/',
      },
    ]),
    new DuplicatePackageCheckerPlugin(),
  ],
};
