module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'semi': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'linebreak-style': 'off',
    'operator-linebreak': 'off'
  }
}