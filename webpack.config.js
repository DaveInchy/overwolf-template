const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OverwolfPlugin = require('./overwolf.webpack');

module.exports = env => ({
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            "node_modules",
            "src/**/*"
        ],
        fallback: {
            "url": false,
            "fs": require.resolve("fs-extra"),
            "crypto": require.resolve("crypto-browserify"),
            "zlib": require.resolve("zlibjs"),
            "http": require.resolve("stream-http"),
            "fetch": require.resolve("node-fetch"),
            "process": require.resolve("process/"),
        },
    },
    entry: {
        service: './src/service/service.ts',
        overlay: './src/windows/overlay.ts',
        desktop: './src/windows/desktop.ts',
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/preset-env"
                            ],
                            "plugins": [
                                "@babel/plugin-syntax-jsx"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            "plugins": [
                                "@babel/plugin-syntax-jsx"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(ts)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/preset-env",
                                "@babel/preset-typescript"
                            ],
                            "plugins": [
                                "@babel/plugin-syntax-jsx"
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.(tsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript"
                            ],
                            "plugins": [
                                "@babel/plugin-syntax-jsx"
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    output: {
      path: path.resolve(__dirname, 'build/'),
      filename: 'bin/[name].js'
    },
    plugins: [
        new CleanWebpackPlugin,
        new CopyPlugin({
            patterns: [ { from: "app", to: "./" } ],
        }),
        new HtmlWebpackPlugin({
            template: './src/service/service.html',
            filename: path.resolve(__dirname, './build/service.html'),
            chunks: ['service']
        }),
        new HtmlWebpackPlugin({
            template: './src/modules/owReact/template.html',
            filename: path.resolve(__dirname, './build/desktop.html'),
            chunks: ['desktop']
        }),
        new HtmlWebpackPlugin({
            template: './src/modules/owReact/template.html',
            filename: path.resolve(__dirname, './build/overlay.html'),
            chunks: ['overlay']
        }),
        new OverwolfPlugin(env),
    ],
})
