/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:;
      style-src 'self' 'unsafe-inline' https:;
      img-src 'self' blob: data: https:;
      connect-src 'self' https: http:;
      font-src 'self' data: https:;
    `.replace(/\s{2,}/g, ' '),
  },
];

// 👇 Replace with your actual GitHub repo name
const repoName = 'bestfortravel'; // or whatever your repository name is

const nextConfig = {
  output: 'export', // enables static export
  basePath: `/${repoName}`, // required for GH Pages
  images: {
    unoptimized: true, // disables Next image optimization
  },
  async headers() {
    // These headers won't be used by GitHub Pages but safe to keep
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
