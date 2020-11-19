/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },    
  resolve: {
    extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.webpackCache')
            }
          },
          'babel-loader'
        ]
      },
      {
          test: /\.(ts|js)x?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
    }

    ]
  },
  plugins: [ 
    new CopyPlugin({
    patterns: [
      // ALL .ejs files copied under '<top-level-dist>/email-templates', maintaining sub-folder structure
      {
        from: 'services/core/functions/apollo/graphql/schema.graphql',
        to: 'services/core/functions/apollo/schema.graphql'
      }
    ],
  }),
  new ForkTsCheckerWebpackPlugin()
]
};