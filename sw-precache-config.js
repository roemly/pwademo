module.exports = {
  staticFileGlobs: [
    'dist/shop/**.html',
    'dist/shop/**.js',
    'dist/shop/**.css',
    'dist/shop/assets/images/*',
    'dist/shop/assets/icons/*',
    'dist/shop/assets/roboto/*',
  ],
  root: 'dist/shop',
  stripPrefix: 'dist/shop/',
  navigateFallback: '/shop/index.html',
  runtimeCaching: [{
    urlPattern: /https:\/\/ptamp\.co.id\/shop/,
    handler: 'networkFirst'
  }],
  importScripts: ["./push-notification.js"]
};
