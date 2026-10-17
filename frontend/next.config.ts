/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is commonly opened through 127.0.0.1 instead of localhost.
  // Allow both hostnames for Next.js development assets and HMR requests.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
