const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader', // 透過 import 圖片進 entry point ，（為了將圖片複製到部署的資料夾，這邊目前沒設定壓縮
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            // loader: 'style-loader/url',  // creates style nodes from JS strings (link style)，有引入 js 的話，會動態載入 <link>
            loader: 'style-loader', // creates style nodes from JS strings (inline style)
          },
          // {
          //     loader: 'file-loader',
          //     options: {
          //         name: './css/[name].css'
          //     }
          // },
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // 將 sass 解譯成 css，預設使用 node-sass
          // 順序是有關係的，越下面的越先開始執行
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
  plugins: [],
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
