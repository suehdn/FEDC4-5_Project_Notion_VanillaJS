const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== "production";

  return {
    entry: "./src/main.js",
    resolve: {
      extensions: [".js"],
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "index.js",
      clean: true,
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.(js)$/i,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.html$/i,
          use: {
            loader: "html-loader",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
      }),
    ],
  };
};
