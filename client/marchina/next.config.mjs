/ @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains:['via.placeholder.com','localhost','play-lh.googleusercontent.com','images.unsplash.com', 'play-lh.googleusercontent.com'],
  },
}

export default nextConfig