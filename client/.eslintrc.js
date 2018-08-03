// 有需要再补充
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'space-before-function-paren': ['error', 'always'],
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/no-array-index-key': [0],
    'react/destructuring-assignment': [0],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'ignore'
    }],
    'jsx-a11y/anchor-is-valid': [0],
    'import/no-named-as-default': [0],
    'import/no-named-as-default-member': [0],
    'import/prefer-default-export': [0], // export 多个时也报错，只能关闭了
    'react/require-default-props': [0], // 为了使得prop-types不至于那么严格
    'no-console': [0],
    'no-bitwise': [0], // 可以使用~
    'no-mixed-operators': [0],
  }
}
