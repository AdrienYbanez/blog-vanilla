const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: { //chunks
        main: path.resolve(__dirname, "src/index.js"),
        form: path.resolve(__dirname, "src/form/form.js"),
        topbar: path.resolve(__dirname, "src/assets/javascripts/topbar.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /.js/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: './src/assets/img/*', to: "assets/img", flatten: true }
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, "./src/index.html"),
            chunks: ["main", "topbar"]
        }),
        new HtmlWebpackPlugin({
            filename: 'form.html',
            template: path.join(__dirname, "./src/form/form.html"),
            chunks: ["form", "topbar"]
        })
    ],
    devtool: "source-map",
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        inline: true,
        open: true,
        hot: true,
        port: 4000
    }
};