/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    env: {
        NEXT_PUBLIC_API_URL:
          process.env.NEXT_PUBLIC_API_URL
      },
    reactStrictMode: true,
    images: {
        domains: ["artic.edu"]
    },
}

