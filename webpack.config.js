// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['./assets/js/main.js', './assets/scss/main.scss', './index.html'],
  // optimization: {
  //   minimize: false,
  //   removeComments: true,
  // },
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    // open: true,
    hot: true,
    port: 4000
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src/index.html'),
    //   filename: 'index.html',
    //   minify: {
    //     collapseWhitespace: false
    //   }
    // }),
    // new CleanWebpackPlugin (),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/images')
        },
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/favicon.ico')
        },
        {
          from: path.resolve(__dirname, 'src/mail.php'),
          to: path.resolve(__dirname, 'dist/mail.php')
        },
      ]
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[name].[contenthash].js.map',
    //   exclude: ['vendor.js']
    // })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              //removeComments: true,
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(?:|jpg|jpeg|gif|png|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `./images/${filename('[ext]')}`
            }
          }
        ],
      },
      {
        test: /\.(?:|woff)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `fonts/[name].[ext]`,
              publicPath: "../",
            }
          }
        ]
      }
    ]
  }
}