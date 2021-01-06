module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true // 加这个才支持装饰器的
    }
  },
  rules: {
    'no-undef': 'off',
    'no-sequences': 'off',
    'no-tabs': 'off',
    allowIndentationTabs: 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
