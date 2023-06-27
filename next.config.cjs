/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    images: {
        domains: ["artic.edu"]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
