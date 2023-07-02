module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@pages': './src/pages',
          '@consts': './src/consts',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
