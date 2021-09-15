const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'index.bundle.js'
        filename: '[name].bundle.js' // 當有多個 entry point 時，可以用 [name] 取代每個檔案的名稱
    },
    module: {
        rules: [
            {
                test: /\.txt$/,  // 什麼樣的檔案是想要轉換的(正規表達式)
                // use: 'raw-loader' // 使用什麼 loader
                use: [
                    { loader: ['style-loader'](/loaders/style-loader) },
                    {
                      loader: ['css-loader'](/loaders/css-loader),
                      options: {
                        modules: true
                      }
                    },
                ]
            }            
        ]
    }
}

/**
 * webpack guide
 * 
 * 通常會分為2種資料夾，source 和 distribution，
 * 分別放[原始碼]與要[發佈]的檔案
 * 
 * 除了 js 的 import export 語法之外， webpack 預設不會轉譯任何程式，
 * 所以如果需要相容瀏覽器，要使用 babel
 * 
 */

/**
 * webpack configuration
 * 
 * webpack 並不一定要求一定要有 config file ，但若沒有， webpack 會假設你的 entry point 為 src/index.js
 * 並且輸出壓縮至 dist/main.js 預設為 production 模式。
 */



/***
 * webpack loader
 * 
 * 是為了處理 import 進 js 檔案
 * 
 * loader 是一個轉換器，我們透過 module 將其引入。也可以用 import 的方式。
 * 在其他包版工具，loader 就像 task 一樣。他可以將 typescript 轉為 js，或是將 image 轉為 data url 等。
 * 甚至允許你從 js module 中，引入 css files
 * 
 * loader feature 
 * loader 可以用鏈式方式撰寫，每個 loader 使用 transformations 去處理 resource 。
 * 鏈式是反過來執行的，第一個 loader 將結果（resource with applied transformations），傳遞至下一個。
 * 最後 webpack 由最後一個 loader 回傳 js 返回至第一個。
 * 
 * loader 可以是同步或非同步的。
 * 
 * loader 在 node 中運行，可以在 node 中做任何事。
 * 
 * loader 可以傳入 options object 做為設定。
 * 
 * pligin 能給 loader 更多強大的功能。
 * 
 * normal module 也可以透過 package.json 的 loader field 輸出
 * 
 * loder 可以被任意的 file 觸發
 */


 /**
  * output
  * 
  * 控制如何將文件寫入硬碟，
  * 雖然可以有多個 entry point，但是 output 只能有一個。
  * 
  */

  /**
   * webpack-dev-server 
   * 
   * 執行 webpack-dev-server --open ，預設會執行 webpack.config.js 裡的設定，
   * 就可以達成 hot Reload 。 
   * 紀錄一下踩雷心情，我還不知道能不能改預設執行 webpack.config.js 的方法，
   * 但曾經因為我主要執行的檔案名是 webpacl.config.dev.js，
   * 而導致一直發生錯誤，= =
   * 
   */


   /**
    * definePlugin
    * 
    * webpack 並不鼓勵直接使用 node.js 裡的 process.env.NODE_ENV 參數
    * 
    */

  /////===============//////

  /**
   * 試著去編譯 sass 檔案的心得
   * 
   * 用sass-loader => css-loader => style-loader
   * 最後載入 css 這段，也會被寫在bundle.js 裡，
   * 在 liveLoad的時候，以 <style> 標籤的方式，被寫進html
   * 
   */