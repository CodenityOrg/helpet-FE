const webpack = require("webpack");

module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
            mapboxgl: 'mapbox-gl'
        })
      ]
    },
    devServer: {
      host: '0.0.0.0',
      port: 8080, // CHANGE YOUR PORT HERE!
    }
  }