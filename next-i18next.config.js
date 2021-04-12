const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en', 'it', 'ru'],
    localePath: path.resolve('./public/locales'),
  },
};
