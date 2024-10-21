const path = require('path');
// const __dirname = import.meta.dirname;

module.exports = {
  mode: 'production',
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
};
