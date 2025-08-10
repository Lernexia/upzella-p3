import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configure PDF.js worker
      config.resolve.alias = {
        ...config.resolve.alias,
        'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.js',
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/_next/static/js/(.*).js',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'unsafe-none',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
