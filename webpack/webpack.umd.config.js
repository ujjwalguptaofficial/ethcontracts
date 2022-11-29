const path = require('path');
const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');


const appName = baseConfig.name;
const isDev = process.env.NODE_ENV === "development";

module.exports = merge(baseConfig, {
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.join(__dirname, "../dist"),
        library: 'EthContracts',
        libraryTarget: "umd",
        filename: isDev ? `${appName}.umd.js` : `${appName}.umd.min.js`
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve('build_helper', 'npm.export.umd.js'), to: '' },
            ],
        }),
    ]
})