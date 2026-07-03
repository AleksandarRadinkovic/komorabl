/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'pkspbl.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Sanity Studio uses React Compiler internals not available in Next.js 14/React 18
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/compiler-runtime': false,
    };
    return config;
  },
};

export default nextConfig;
