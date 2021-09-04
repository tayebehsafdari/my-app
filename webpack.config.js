const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

var config = {
    context: __dirname,
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        index: true,
        mimeTypes: {'text/html': ['phtml']},
        publicPath: '/publicPathForDevServe',
        serverSideRender: true,
        writeToDisk: true,
        static: './dist',
        // hot: true
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[name][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[name][ext][query]'
                }
            },
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'Output Management',
            filename: 'index.html',
            template: 'public/index.html',
            inject: 'body',
            // favicon: './public/favicon.ico',
            meta: {
                keywords: 'Tayebeh Safdari, Senior Front-End Web Developer, Graphic Designer, UX/UI Designer, Web Designer, HTML, CSS, Bootstrap, Sass, jQuery, Webpack, React, JavaScript',
                description: 'Senior Front-End Web Developer and UX/UI Designer',
                author: 'Tayebeh Safdari',
                // viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            classie: 'desandro-classie',
            Filterizr: 'filterizr',
            Typed: 'typed.js'
        }),
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json'
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
        assetModuleFilename: '[name][ext]'
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all'
        }
    }
};

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    if (isEnvDevelopment) {

    }
    if (isEnvProduction) {

    }
    return config;
};