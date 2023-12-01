
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LifePlugin = require("./src/plugins/LifePlugin")
const FileListPlugin = require("./src/plugins/FileListPlugin")

module.exports = {
  // 入口文件配置
  entry: "./src/js/index.js",
  // 出口文件配置
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  // 模式选择（默认）
  mode: "production",

  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      // {
      //   test: /\.ts$/, // ts\tsx\js
      //   use: [
      //     'babel-loader',
      //     'ts-loader'
      //   ],
      //   options: { cacheDirectory: true }, // 缓存公共文件
      //   exclude: /node_modules/
      // },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        // 自动选择导出为单独文件还是url形式
        type: 'asset'
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: "index.html",
      inject: "body"
    }),

    // new LifePlugin({name: "lnp"}),
    new FileListPlugin(),
  ]
};
