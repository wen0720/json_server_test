const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './index.js',
  },
  context: path.resolve('src'),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new cleanWebpackPlugin(), // 清除掉 /dist 檔案的資料，在每次包版的時候
    new HtmlWebpackPlugin({
      title: 'json-server Test',
      filename: 'index.html', // 輸出後的路徑
      template: 'html/index.html', // 被編譯的模板
    }),
  ],
};
