const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: [ './src/index.js', './src/styles.scss' ],
  output: {
    path: path.join( __dirname, '/dist' ),
    filename: isDevelopment ? '[name].js' : '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: { helperDirs: path.resolve( __dirname, './src/utilities' ) }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.scss' ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ]
};