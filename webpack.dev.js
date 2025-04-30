const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 3001,
  },
  devtool: "inline-source-map",
});
