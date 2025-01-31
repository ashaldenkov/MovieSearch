/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
    {
      protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**'
    },
    {
      protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**'
    }
  ],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
}
};

export default nextConfig;