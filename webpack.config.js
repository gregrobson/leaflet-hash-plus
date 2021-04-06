const path = require('path');

module.exports = {
  entry: './src/leaflet-hash-plus.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'leaflet-hash-plus.js',
    globalObject: 'this',
    library: {
      name: 'leafletHashPlus',
      type: 'umd',
    },
  },
};