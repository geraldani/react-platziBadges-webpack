const URL = 'http://localhost:8080/';//el puesto por donde corre el servidor de jason server
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const addAssetHtml = require('add-asset-html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const optimizeCssAssets = require('optimize-css-assets-webpack-plugin');//para minificar css
const terserWbpack = require('terser-webpack-plugin');//para minificar mejor js
module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        publicPath: URL,
        chunkFilename: "js/[id].[chunkhash].js"
    },
    optimization: {
        minimizer: [
            new terserWbpack(),
            new optimizeCssAssets()
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    'css-loader',
                ]
            },
            {
                test: /\.jpe?g|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        outputPath: 'assets/',
                        name: '[hash].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./modules-manifest.json')
        }),
        new addAssetHtml({
            filepath: path.resolve(__dirname, 'dist', 'js', '*.dll.js'),
            outputPath: 'js',
            publicPath: URL + 'js'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/app.*','**/modules.*.*'],
        })
    ],
};