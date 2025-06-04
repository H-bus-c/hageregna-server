const path = require("path");

module.exports = {
  entry: {
    main: "./index.js",
  },
  output: {
    path: path.join(__dirname, "build-server"),
    publicPath: "/",
    filename: "index.js",
    clean: true,
  },
  mode: "production",
  target: "node",
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
};
