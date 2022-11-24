const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const banner = require('../build_helper/licence');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const appName = "ethcontracts";
module.exports = {
    name: appName,
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        ]
    },
    // externals: {
    //     web3: 'web3',
    // },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new CopyPlugin({
            patterns: [
                { from: path.resolve('build_helper', 'npm.export.js'), to: '' },
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ]
}