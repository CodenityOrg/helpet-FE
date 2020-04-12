const webpack = require("webpack");

module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
            mapboxgl: 'mapbox-gl'
        })
      ],
      optimization: {
        splitChunks: {
          minSize: 10000,
          maxSize: 200000,
        }
      }
    },
    devServer: {
      host: '0.0.0.0',
      port: 8080, // CHANGE YOUR PORT HERE!
    }
  }