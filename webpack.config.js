const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },
          ],
    },
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
      }

}