module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'no-console': ['error', {allow: ['log', 'warn', 'error']}],
    'global-require': 'off',
    'consistent-return': 'off'
  }
}
