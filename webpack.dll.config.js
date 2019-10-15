const path = require('path');
const webpack = require('webpack');
const optimizeCssAssets = require('optimize-css-assets-webpack-plugin');//para minificar css
const terserWbpack = require('terser-webpack-plugin');//para minificar mejor js

module.exports = {
    entry: {
        modules: [
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].dll.js',
        library: '[name]',
    },
    optimization: {
        minimizer: [
            new terserWbpack(),
            new optimizeCssAssets()
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname, '[name]-manifest.json')
        })
    ],
};

