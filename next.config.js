const { i18n } = require('./next-i18next.config');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    // Important: return the modified config
    return config;
  },
  trailingSlash: process.env.APP_ENV === 'static',
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/mint': { page: '/mint' },
    };
  },
  images: {
    domains: ['cloudflare-ipfs.com'],
  },
  i18n,
};
