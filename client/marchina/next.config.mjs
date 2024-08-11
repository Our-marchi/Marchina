/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.isanook.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iphonewired.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tinyurl.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;