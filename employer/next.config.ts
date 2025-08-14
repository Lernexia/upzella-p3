const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf2json"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
    // Custom ESLint rules to suppress specific errors
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // covers all locations of 'Unexpected any. Specify a different type.'
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-const": "warn",
      "react/no-unescaped-entities": "off",
    },
  },
};

module.exports = nextConfig;
