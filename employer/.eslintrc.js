module.exports = {
  root: true,
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prefer-const': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
