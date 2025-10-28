/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    // Allow external images from Freepik (ensure you use a direct image URL, not a webpage URL)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig