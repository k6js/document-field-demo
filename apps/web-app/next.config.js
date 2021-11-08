const withPreconstruct = require('@preconstruct/next');

const serverUrl = process.env.SERVER_URL || 'http://localhost:8101';
const apiUrl = process.env.API_URL || 'http://localhost:8100';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  env: {},
  publicRuntimeConfig: {
    serverUrl,
    apiUrl,
  },
  rewrites: () => [{ source: '/api/graphql', destination: `${apiUrl}/api/graphql` }],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};


module.exports = withPreconstruct({
  ...nextConfig,
});
