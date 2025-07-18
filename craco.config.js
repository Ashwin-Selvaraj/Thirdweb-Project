const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "zlib": require.resolve("browserify-zlib"),
          "stream": require.resolve("stream-browserify"),
          "buffer": require.resolve("buffer"),
          "crypto": require.resolve("crypto-browserify"),
          "util": require.resolve("util"),
          "assert": require.resolve("assert"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "url": require.resolve("url"),
          "path": require.resolve("path-browserify"),
          "fs": false,
          "net": false,
          "tls": false
        }
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
    ]
  }
}; 