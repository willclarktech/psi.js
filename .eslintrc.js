module.exports = {
  env: {
    es2020: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'prettier', 
    '@typescript-eslint/eslint-plugin', 
    'eslint-plugin-tsdoc'
  ]
}
