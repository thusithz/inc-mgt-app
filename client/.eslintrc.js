module.exports = {
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: ['airbnb-typescript', 'airbnb/hooks', 'prettier', 'next'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off',

    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*', '..'],
      },
    ],
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',

    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off',

    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'jsx-a11y/anchor-is-valid': 'warn',
    'func-names': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
