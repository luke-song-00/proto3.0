module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
