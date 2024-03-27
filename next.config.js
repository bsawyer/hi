/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  basePath: "/hi",
  images: {
    unoptimized: true ,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ]
  },
}
 
module.exports = nextConfig