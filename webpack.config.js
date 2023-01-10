const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [
    {
        mode: 'production',
        entry: './src/Application.ts',
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: 'ts-loader' },
                { test: /\.bmp$/, type: 'asset/resource' }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    },
    {
        mode: 'production',
        entry: './src/synthesizer.audio-worklet.ts',
        output: {
            filename: 'synthesizer.audio-worklet.js',
            path: path.join(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: 'ts-loader' }
            ]
        }
    }
];
