const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js', // 파일의 진입점(entry point)는 ./src/index.js가 된다.
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js', // entry point의 Key가 main이므로, main.js로 빌드된다.
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 정적 파일이 위치하는 디렉토리를 결정한다.
    },
    client: {
      overlay: {
        errors: true, // 오류 발생시 브라우저 화면에 표시할 지 여부를 결정한다.
        warnings: false, // 경고 발생시 브라우저 화면에 표시할 지 여부를 결정한다.
      },
    },
    historyApiFallback: true, // 404 응답 대신 index.html 페이지를 제공하기 위한 설정이다.
    compress: true, // 정적 파일들을 gzip으로 압축할 지 여부를 결정한다.
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일을 의미한다.
        use: ['style-loader', 'css-loader'], // style-loader를 앞에 적용해야 오류가 발생하지 않는다.
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }), // 템플릿 HTML의 경로를 지정한다.
  ],
};
