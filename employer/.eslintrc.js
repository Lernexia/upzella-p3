module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // covers all locations of 'Unexpected any. Specify a different type.'
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prefer-const": "off",
    "react/no-unescaped-entities": "off",
  },
};
