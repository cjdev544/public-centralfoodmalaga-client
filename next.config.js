const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})
