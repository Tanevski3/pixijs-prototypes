const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  entry: path.resolve(__dirname) + "/src/ts/index.ts",
  /** Telling webpack to extract typescript source maps and include in our final bundle  */
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test'
    })
  ]
};