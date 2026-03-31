/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/juntoadvisory',
  assetPrefix: '/juntoadvisory/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;