const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    open: true
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },           
        {
            test: /\.(s*)css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader'
              },
              'sass-loader'
            ]
        },
        {
          test: /\.(png|svg|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/img/[name].[ext]'
              }
            }
          ]
        }            
    ]
  },  
  plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '/css/style.css',
      }),               
  ]
};