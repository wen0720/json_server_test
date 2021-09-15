module.exports = {
  env: { // 這邊預定義的該環境的全局變量
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module', // 如果使用 ECMAScript 模塊
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
  },
};
