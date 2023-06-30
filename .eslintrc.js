module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'], // airbnb-base와 prettier를 사용한다.
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module', // ESM import 구문을 사용한다.
  },
  rules: {
    'prettier/prettier': 'error', // prettier의 문법 검사 결과를 오류로 처리한다.
    'import/no-unresolved': 2, // import 구문에서 경로를 검사한다.
  },
};
