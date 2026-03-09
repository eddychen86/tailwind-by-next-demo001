/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/tailwind-by-next-demo001',
    reactStrictMode: true,
    images: {
          unoptimized: true,
    },
}

module.exports = nextConfig
