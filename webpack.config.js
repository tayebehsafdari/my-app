const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

var config = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        // hot: true
    },
    stats: 'errors-only',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            filename: 'index.html',
            template: 'public/index.html',
            favicon: './public/favicon.ico',
            meta: {
                keywords: 'Tayebeh Safdari, Senior Front-End Web Developer, Graphic Designer, UX/UI Designer, Web Designer, HTML, CSS, Bootstrap, Sass, jQuery, Webpack, React, JavaScript',
                description: 'Senior Front-End Web Developer and UX/UI Designer',
                author: 'Tayebeh Safdari',
                viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            classie: 'desandro-classie',
            Filterizr: 'filterizr',
            Typed: 'typed.js'
        }),
        /* new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }) */
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
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
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
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
    if (argv.mode === 'development') {

    }
    if (argv.mode === 'production') {

    }
    return config;
};