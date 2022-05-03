const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.resolve(__dirname, "../src"),
  dist: path.resolve(__dirname, "../dist"),
  assets: "assets/",
};

const PAGES_DIR = `${PATHS.src}/pages/`;

const entryPoints = { common: `${PATHS.src}/common.js` };

// Getting paths containing "filter" to all files in "startPath" directory and all it's subdirectories
function getFilesPaths(startPath, filter) {
  var filesPathes = [];
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      filesPathes = filesPathes.concat(getFilesPaths(filename, filter)); //recursion
    } else if (filename.indexOf(filter) >= 0) {
      filesPathes.push(filename);
    }
  }
  return filesPathes;
}

// Adding js files of each page to entryPoints object
getFilesPaths(PAGES_DIR, ".js").forEach(function (filepath) {
  Object.assign(entryPoints, { [`${path.basename(filepath, ".js")}`]: filepath });
});

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: entryPoints,
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: [/fonts/],
        loader: "file-loader",
        options: {
          name: `./${PATHS.assets}img/[name].[ext]`,
        },
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
        include: [/fonts/],
        loader: "file-loader",
        options: {
          name: `${PATHS.assets}fonts/[name].[ext]`,
          publicPath: `../../`,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../",
            },
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true, config: { path: "build/postcss.config.js" } },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    ...getFilesPaths(PAGES_DIR, ".pug").map(
      (page) =>
        new HtmlWebpackPlugin({
          chunks: ["common", path.basename(page, ".pug")],
          template: page,
          filename: `./${path.basename(page).replace(/\.pug/, ".html")}`,
        })
    ),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};
