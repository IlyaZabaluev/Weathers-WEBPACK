const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-cheap-source-map",
  plugins: [
    new ESLintPlugin({
      configType: "eslintrc",
      lintDirtyModulesOnly: true,
      fix: true,
      failOnError: true,
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
});
