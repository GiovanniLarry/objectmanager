import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/_/backend/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:3000/:path*' 
          : 'http://localhost:3000/:path*',
      },
    ];
  },
};

export default nextConfig;
