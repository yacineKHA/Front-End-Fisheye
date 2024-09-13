module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
    },
    extends: 'eslint:recommended',
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
    },
  },
];