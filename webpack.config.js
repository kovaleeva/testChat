const webpack = require('webpack');
const path = require('path');

const config = {
    entry: [
        path.join(__dirname, '/client/index.jsx'),
    ],
    watch: true,
    mode: 'development',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
    },
    output: {
        path: `${__dirname}/public`,
        filename: 'bundle.js',
        library: 'home',
    },
    devServer: {
        contentBase: path.join(__dirname, '/client/'),
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    resolveLoader: {
        extensions: ['*', '.js', '.jsx'],
    },
};

module.exports = config;
