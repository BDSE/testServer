const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanDistFolder = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const WebpackStrip = require('webpack-strip');
const isPrd = process.env.NODE_ENV === 'production';
//const ASSET_PATH = process.env.ASSET_PATH || '';
const context = __dirname + '/src';

//Add js libraries here.
const VENDOR_LIB = [
    'jquery',
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'prop-types'
];

let config = {
    entry: {
        vendor: VENDOR_LIB,
        main: './index.js'
    },
    context: path.resolve(context),
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(context, 'build'),
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
         '/api': 'http://localhost:8080'
        },
        historyApiFallback: true,
        contentBase: './src/index.html',
        watchContentBase: true
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"]
            })
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader", // creates style nodes from JS strings
                use: [
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            outputStyle: (!isPrd) ? "expanded" : "compressed",
                            sourceComments: (!isPrd) ? true : false,
                            sourceMap: false
                        }
                    }
                ]
            })
        },
        {
            test: /\.js$/,
            exclude: [/lib/, /node_modules/],
            use: 'babel-loader'
        },
        {
            test: /\.js$/, // include .js files
            enforce: "pre", // preload the jshint loader
            exclude: [/lib/, /node_modules/], //exclude file from node_modules folder
            use: [{
                loader: "eslint-loader", //options can be modified according to the preferences.
                options: {
                    emitError: true,
                    failOnError: true,
                }
            }]
        },
        {
            test: /\.js$/,
            use: ["source-map-loader"],
            exclude: /node_modules/,
            enforce: "pre"
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: [{
                loader: 'file-loader'
            }]
        },
        {
            //for the html templates that needs to be converted to a jsp, raw loader will let the webpack ignore the jsp syntax
            // and not throw an error.
            test: /\.html$/,
            use: 'raw-loader'
        }
        ]
    },
    plugins: [
        new CleanDistFolder([context + "/build"]),
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new htmlWebpackPlugin({
            chunks: ['main', 'vendor', 'manifest'],
            title: 'Test Webapp!',
            template: './indexTemplate.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            //this plugin makes sure that chunks that are common between two entry points are not loaded multiple times
            //in this case vendor chunk will not be loaded twice even if you import a vendor file, say jquery, in your modules.
            names: ['vendor', 'manifest'], //only add the common chunk to this bundle.
            minChunks: Infinity //infinity will not allow any other common chunk to be added in this vendor chunk.
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

if (!isPrd) {
    if (process.env.reload) {
        config.plugins.push(
            new WebpackShellPlugin({
                onBuildStart: ['echo "Webpack starting build"'], onBuildExit: ['echo "rsync......"', 'cp-res']
            })
        );
    }
    config = merge(config, {
        devtool: 'eval-source-map' // source maps for JS
    });
}
//for production
else {
    config = merge(config, {
        devtool: 'none',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: WebpackStrip.loader('console.log'),
                    options: {
                        strip: ['console.log']
                    }
                }
            ]
        },
        plugins: [
            new UglifyJSPlugin({
                sourceMap: false,
                uglifyOptions: {
                    ie8: false,
                    ecma: 8,
                    parallel:true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            })
        ]
    });
}
const WebpackConfig = config;
module.exports = WebpackConfig;
