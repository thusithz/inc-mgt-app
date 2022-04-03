module.exports = {
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off',

    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    noUnusedLocals: 'off',

    'import/prefer-default-export': 'off',

    // 'no-restricted-imports': [
    //   'error',
    //   {
    //     patterns: ['../*', '..'],
    //   },
    // ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      ts: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
};
