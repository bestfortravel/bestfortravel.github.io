const repoName = 'bestfortravel';

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

export default {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: '/',
  basePath: '',
  distDir: '.next',
  compiler: { removeConsole: false },

  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
