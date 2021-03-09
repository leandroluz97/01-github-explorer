const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const isDevelopment = process.env.Node_ENV !== "production"

module.exports = {
  //development mode
  mode: isDevelopment ? "development" : "production",

  //source map to keep track error when debugging
  devtool: isDevelopment ? "eval-source-map" : "source-map",

  //entry source where are going to work and the output
  entry: path.resolve(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  //types of extension that webpack will deal with
  resolve: {
    extensions: [".js", ".jsx"],
  },

  //handle our server
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
  },

  //plugin html is going to serve a new html in dist without the <script src>.. in thml/public
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),

  //loader to deal with different files
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
}
