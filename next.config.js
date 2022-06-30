/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { images: { layoutRaw: true }},
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_URL: process.env.NEXT_APP_URL,
    NEXT_APP_AUTH_URL: process.env.NEXT_APP_AUTH_URL,
    NEXT_APP_EVENTCENTER_URL: process.env.NEXT_APP_EVENTCENTER_URL,
    NEXT_APP_MAP_API_KEY: process.env.NEXT_APP_MAP_API_KEY,
    NEXT_APP_GEO_LOCATION_API: process.env.NEXT_APP_GEO_LOCATION_API,
    PORT: process.env.PORT,
    NEXT_APP_SSL: process.env.NEXT_APP_SSL,
    NEXT_APP_ENVIRONMENT: process.env.NEXT_APP_ENVIRONMENT,
    NEXT_APP_EVENTCENTER_URL_LOCAL: process.env.NEXT_APP_EVENTCENTER_URL_LOCAL,
    NEXT_APP_URL_DEV: process.env.NEXT_APP_URL_DEV,
    NEXT_APP_AUTH_URL_DEV: process.env.NEXT_APP_AUTH_URL_DEV,
    NEXT_APP_EVENTCENTER_URL_DEV: process.env.NEXT_APP_EVENTCENTER_URL_DEV,
    NEXT_APP_URL_LOCAL: process.env.NEXT_APP_URL_LOCAL,
    NEXT_APP_AUTH_URL_LOCAL: process.env.NEXT_APP_AUTH_URL_LOCAL,
  },
  distDir: 'build'
}

module.exports = nextConfig
