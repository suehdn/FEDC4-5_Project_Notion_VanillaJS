module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  importOrder: [
    '^@consts/(.*)$',
    '^@utils/(.*)$',
    '^@components/(.*)$',
    '^@pages/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
