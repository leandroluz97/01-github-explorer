# 01-github-explorer

React development environment with webpack and typescript
Dependencies used:

- React
- React dom
- Babel
- Webpack
- React Refresh
- Typescript

React dependency

```sh
$ yarn add react
```

React dom dependency

```sh
$ yarn add react-dom
```

Babel dependencies

```sh
$ yarn add @babel/core @babel/cli @babel/preset-env babel-loader @babel/preset-react -D
```

Webpack dependencies

```sh
$ yarn add webpack webpack-cli webpack-dev-server -D
```

Webpack plugin

```sh
$ yarn add html-webpack-plugin -D
```

Webpack css loaders

```sh
$ yarn add style-loader css-loader -D
```

Webpack sass loader

```sh
$ yarn add sass-loader -D
```

Sass dependency

```sh
$ yarn add node-sass -D
```

React Refresh webpack

```sh
$ yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

Typescript

```sh
$ yarn add typescript -D
```

Typescript config file

```sh
$ yarn tsc —init
```

Typescript React dom

```sh
$ yarn add @types/react-dom -D
```

babel.config.js

```javascript
module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
}
```

webpack.config.js

```javascript
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
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  //types of extension that webpack will deal with
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
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
        test: /\.(j|t)sx$/,
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
```

tsconfig.json

```javascript
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "jsx": "react-jsx",
    "noEmit": true,
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}


```
