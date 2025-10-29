/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;"
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig