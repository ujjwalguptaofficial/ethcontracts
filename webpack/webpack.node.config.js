const path = require('path');
const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');

const isDev = process.env.NODE_ENV === "development";
const appName = baseConfig.name;

const libraryTarget = [{
    type: "commonjs2",
    name: isDev ? `${appName}.node.js` : `${appName}.node.min.js`
}];

function getConfigForTaget(target) {
    return
}

function createConfigsForAllLibraryTarget() {
    var configs = [];
    libraryTarget.forEach(function (target) {
        configs.push(merge(baseConfig, getConfigForTaget(target)));
    })
    return configs;
}

module.exports = merge(baseConfig, {
    target: "node",
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "../dist"),
        libraryTarget: "commonjs2",
        filename: isDev ? `${appName}.node.js` : `${appName}.node.min.js`
    }
});