module.exports = {
    root: true,
    plugins: ['@typescript-eslint'],
    extends: [
      "eslint:recommended",                                 
      "plugin:@typescript-eslint/recommended",
      "airbnb",
      "airbnb-typescript"
    ],
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
      'noUnusedLocals': 'off',
      'max-len': 'warn',
      'consistent-return': 'warn',
      'import/prefer-default-export': 'off',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  };
  