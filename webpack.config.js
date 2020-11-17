const webpack = require('webpack');
const path = require('path');

const paths = {
  appBuild: path.resolve(__dirname, 'build'),
  appIndexHtml: path.resolve(__dirname, 'public/index.html'),
  appIndexJS: path.resolve(__dirname, 'src/index.js'),
  appSrc: path.resolve(__dirname, 'src'),
  nodePaths: path.join(__dirname, 'node_modules'),
};

const publicHTML = {
  index: 'index.html',
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const appEnv = process.env.NODE_ENV || 'development';

const config = {
  mode: appEnv,
  entry: {
    main: ['whatwg-fetch', 'babel-polyfill', paths.appIndexJS],
  },
  output: {
    publicPath: '/',
    path: paths.appBuild,
    filename: `[name].js`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      envConfig$: path.join(paths.appSrc, 'config', 'env', appEnv + '.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: paths.nodePaths,
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: `[name].[ext]`,
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: `[name].[ext]`,
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(appEnv)
      }
    }),
    new CleanPlugin(['build']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      filename: publicHTML.index,
      template: paths.appIndexHtml,
      inject: 'body',
      minify: true,
      chunksSortMode: 'manual',
      chunks: ['vendors', 'main'],
      env: {
        name: appEnv
      }
    }),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new CopyWebpackPlugin([
      { from: './assets/images', to: 'images' },
    ])
  ]
}


const regex = new RegExp(/(prod)/);
if (regex.test(appEnv)) {
  // minify uglify the JS
  config.optimization = {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }), new OptimizeCssAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'initial' },
      },
    },
  };
  config.plugins.push(new StatsPlugin('stats.json', {
    chunkModules: true,
    exclude: [/node_modules[\\\/]react/]
  }));
} else {
  config.devtool = '#inline-source-map';
}

module.exports = config;
