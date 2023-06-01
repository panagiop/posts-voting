/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    output: 'standalone'
};

module.exports = nextConfig;
