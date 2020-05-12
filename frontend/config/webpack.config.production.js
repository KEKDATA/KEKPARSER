// const glob = require('glob');
const Merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commonConfig = require('./webpack.config.common');

// const PATHS = {
//   src: path.join(__dirname, '../src'),
// };

module.exports = folder =>
  Merge(commonConfig, {
    output: {
      filename: 'frontassets/js/app-min.[hash:10].js',
      path: path.join(__dirname, `../build-tmp/${folder}/client`),
      chunkFilename: 'frontassets/js/[name].chunk.[chunkhash:10].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(css|pcss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },

    plugins: [
      new webpack.HashedModuleIdsPlugin({
        hashFunction: 'md4',
        hashDigest: 'base64',
        hashDigestLength: 8,
      }),
      new MiniCssExtractPlugin({
        filename: 'frontassets/css/[name].[hash:10].css',
        chunkFilename: 'frontassets/css/[id].[chunkhash:10].css',
      }),
      // Этот зверь слишком дохуя хочет по времени. Запускать только на проде, на тесте долго.
      // new PurgecssPlugin({
      //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      // }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          zindex: false,
          discardComments: { removeAll: true },
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        hash: true,
        inject: true,
        template: './src/index.html',
        preload: ['**/*.*'],
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
      }),
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.woff2?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8,
        cache: true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundleAnalyzer.html',
        openAnalyzer: false,
      }),
    ],
  });
