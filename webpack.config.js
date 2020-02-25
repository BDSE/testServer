const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanDistFolder = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const WebpackStrip = require('webpack-strip');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const isPrd = process.env.NODE_ENV === 'production';
//const ASSET_PATH = process.env.ASSET_PATH || '';
const context = __dirname + '/src';

//Add js libraries here.
const COMMON_VENDOR = [
    'jquery'
];
const REACT_VENDOR = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'prop-types'
];

let config = {
    entry: {
        commonVendor: COMMON_VENDOR,
        reactVendor: REACT_VENDOR,
        reactApp: './reactIndex.js',
        nonReactApp: './nonReactIndex.js'
    },
    context: path.resolve(context),
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(context, 'build'),
        publicPath: './'
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
                                sourceComments: (!isPrd),
                                sourceMap: false
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
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
        new CleanDistFolder([path.resolve(context, 'build')]),
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new htmlWebpackPlugin({
            chunks: ['manifest', 'commonVendor', 'reactVendor', 'reactApp'],
            title: 'Test React App!',
            template: './reactIndexTemplate.html',
            filename: path.resolve(context, 'build')+'/reactIndex.html',
            chunksSortMode: function (chunk1, chunk2) {
                var orders = ['manifest', 'commonVendor', 'reactVendor', 'reactApp'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                if (order1 > order2) {
                    return 1;
                } else if (order1 < order2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }),
        new htmlWebpackPlugin({
            chunks: ['manifest', 'commonVendor', 'nonReactApp'],
            title: 'Test VanillaJS App!',
            template: './nonReactIndexTemplate.html',
            filename: path.resolve(context, 'build')+'/nonReactIndex.html',
            chunksSortMode: function (chunk1, chunk2) {
                var orders = ['manifest', 'commonVendor', 'nonReactApp'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                if (order1 > order2) {
                    return 1;
                } else if (order1 < order2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            //this plugin makes sure that chunks that are common between two entry points are not loaded multiple times
            //in this case vendor chunk will not be loaded twice even if you import a vendor file, say jquery, in your modules.
            names: ['commonVendor', 'reactVendor', 'manifest'], //only add the common chunk to this bundle.
            minChunks: Infinity //infinity will not allow any other common chunk to be added in this vendor chunk.
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

if (!isPrd) {
    if(process.env.watchMode){
        config = merge(config, {
            watch: true,
            watchOptions: {
                ignored:[/lib/, /node_modules/, /build/, /node/]
            }
        });
        config.plugins.push(
            new WebpackShellPlugin({
                onBuildStart: ['echo "#################### BUILD START ####################"'], onBuildExit: ['echo "#################### BUILD EXIT ####################"', 'cp-res']
            })
        );
    }
    if (process.env.livereload) {
        const livereloadOptions = {
            protocol: "http",
            delay: 500,
            hostname: '127.0.0.1',
            appendScriptTag: true
        };
        //this plugin works with webpack watch, after the watch finish compiling liverlreload is triggered.
        config.plugins.push(
            new LiveReloadPlugin(livereloadOptions)
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
                    parallel: true,
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
