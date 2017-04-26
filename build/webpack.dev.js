var path = require('path')
var webpackConfig = require('./webpack.base')
var webpack = require('webpack')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var config = require('./config')

webpackConfig.devtool = 'source-map'

webpackConfig.entry.app.unshift('../build/dev-client.js')

var env = 'maintenance'

webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(env)
        },
        '__DEVTOOLS__': false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:' + config.port })
])

module.exports = webpackConfig
