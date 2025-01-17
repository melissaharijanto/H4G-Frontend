module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      // Disable the "no-explicit-any" rule if you don't want to enforce it
      '@typescript-eslint/no-explicit-any': 'off', // or 'warn' to just warn
  
      // Allow unused variables to be ignored (not recommended for production)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    }
  };
  