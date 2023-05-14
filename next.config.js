/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'testnasblog.s3.ap-southeast-1.amazonaws.com',
              port: '',
              pathname: '/**',
            },
          ],
            // domain: 'testnasblog.s3.ap-southeast-1.amazonaws.com',
      },
}

module.exports = nextConfig
