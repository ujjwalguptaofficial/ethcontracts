const path = require('path');
const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === "development";
const appName = baseConfig.name;

 

module.exports = merge(baseConfig, {
    target: "node",
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "../dist"),
        libraryTarget: "commonjs2",
        filename: isDev ? `${appName}.node.js` : `${appName}.node.min.js`
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BUILD_ENV': JSON.stringify("node"),
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve('build_helper', 'npm.export.js'), to: '' },
            ],
        }),
    ]
});