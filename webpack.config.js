const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const {extendDefaultPlugins} = require('svgo');

var config = {
    context: __dirname,
    entry: './src/index.js',
    devtool: 'inline-source-map',
    stats: 'errors-only',
    module: {
        rules: [
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
                test: /\.(pdf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[name][ext][query]'
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
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
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
        new HtmlWebpackPlugin({
            filename: 'offline.html',
            template: 'src/offline.html',
            inject: 'body',
            meta: {
                keywords: 'Tayebeh Safdari, Senior Front-End Web Developer, Graphic Designer, UX/UI Designer, Web Designer, HTML, CSS, Bootstrap, Sass, jQuery, Webpack, React, JavaScript',
                description: 'Senior Front-End Web Developer and UX/UI Designer',
                author: 'Tayebeh Safdari',
                // viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            classie: 'desandro-classie',
            Filterizr: 'filterizr',
            Typed: 'typed.js'
        }),
        /* new WebpackManifestPlugin({
            fileName: 'asset-manifest.json'
        }), */
        // new WorkboxPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true
        // }),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/sw.js'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public', 'logo192.png'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'public', 'logo512.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new webpack.ProgressPlugin(),
        /* new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["gifsicle", {interlaced: true}],
                    ["mozjpeg", {progressive: true}],
                    ["pngquant", {optimizationLevel: 5}],
                    [
                        "svgo",
                        {
                            plugins: extendDefaultPlugins([
                                {
                                    name: "removeViewBox",
                                    active: false
                                },
                                {
                                    name: "addAttributesToSVGElement",
                                    params: {
                                        attributes: [{xmlns: "http://www.w3.org/2000/svg"}]
                                    }
                                }
                            ])
                        }
                    ]
                ]
            }
        }) */
    ],
    output: {
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
        config.output.filename = 'static/js/[name].bundle.js';
        config.devServer = {
            // index: true,
            // mimeTypes: {'text/html': ['phtml']},
            // publicPath: '/publicPathForDevServe',
            // serverSideRender: true,
            // writeToDisk: true,
            static: './dist',
            // hot: true
        };
    }
    if (isEnvProduction) {
        config.output.filename = 'static/js/[name].bundle.js';
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].css',
                chunkFilename: '[id].css'
            })
        );
    }
    config.module.rules.push(...[
        {
            test: /\.css$/i,
            use: [isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                isEnvDevelopment
                    ? {
                        loader: 'style-loader'
                    }
                    : {
                        loader: MiniCssExtractPlugin.loader
                    },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }
    ]);
    return config;
};