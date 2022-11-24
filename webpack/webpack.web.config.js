const path = require('path');
const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');


const appName = baseConfig.name;
const isDev = process.env.NODE_ENV === "development";

module.exports = merge(baseConfig, {
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.join(__dirname, "../dist"),
        library: 'EthContracts',
        libraryTarget: "var",
        filename: isDev ? `${appName}.js` : `${appName}.min.js`
    }
})