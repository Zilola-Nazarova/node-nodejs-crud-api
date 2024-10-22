import path from 'path';
import webpack from 'webpack';
const __dirname = import.meta.dirname;

export default {
  mode: 'production',
  entry: './src/server.js',
  devServer: {
    static: './dist'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.cjs'
  },
  target: 'node',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};
