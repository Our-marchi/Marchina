/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com','www.apple.com','s.isanook.com','iphonewired.com','i.pinimg.com','example.com','i.imgur.com','tinyurl.com'],
    },
    transpilePackages: ['jwt-decode']
  }
  
  export default nextConfig