'use strict';

const path = require('path');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        './src/main.js',
        './src/assets/scss/style.scss',
        "babel-polyfill"
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [{
                test: /\.vue$/, //Only work with format files
                loader: 'vue-loader'
            },
            {
                test: /\.(sc|c)ss$/, //Only work with format files
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", //load và đóng gói CSS vào JavaScript
                    "sass-loader" //chuyển đổi Sass thành CSS.
                    //"style-loader" chèn CSS vào bên trong thẻ <style> trong code.
                ]
            },
            {
                test: /\.(js|jsx)$/, //Only work with format files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/, //Only work with format files
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/, //Only work with format files
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: "assets/images/[name].[ext]",
                    esModule: false,
                },
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['svg-inline-loader'],
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'jquery-migrate': 'jquery-migrate'
        },
        extensions: ['*', '.js', '.jsx', '.css', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg', '.vue', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "bundle.min.css",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            'jquery-migrate': 'jquery-migrate'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '/dist'),
        compress: true,
        historyApiFallback: true,
        inline: true, // Live Reloading, set in Boolean style.
        hot: true, //Hot Module Replacement, set in Boolean style.
        open: true,
        open: 'chrome',
        overlay: true,
        port: 9000, // port mặc định là 8080 nhé các bạn.
        stats: {
            normal: true
        }
    },
}