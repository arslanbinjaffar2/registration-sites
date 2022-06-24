/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_APP_AUTH_URL: process.env.REACT_APP_AUTH_URL,
    REACT_APP_EVENTCENTER_URL: process.env.REACT_APP_EVENTCENTER_URL,
    REACT_APP_MAP_API_KEY: process.env.REACT_APP_MAP_API_KEY,
    REACT_APP_GEO_LOCATION_API: process.env.REACT_APP_GEO_LOCATION_API,
    PORT: process.env.PORT,
    REACT_APP_SSL: process.env.REACT_APP_SSL,
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT,
    REACT_APP_EVENTCENTER_URL_LOCAL: process.env.REACT_APP_EVENTCENTER_URL_LOCAL,
    REACT_APP_URL_DEV: process.env.REACT_APP_URL_DEV,
    REACT_APP_AUTH_URL_DEV: process.env.REACT_APP_AUTH_URL_DEV,
    REACT_APP_EVENTCENTER_URL_DEV: process.env.REACT_APP_EVENTCENTER_URL_DEV,
    REACT_APP_URL_LOCAL: process.env.REACT_APP_URL_LOCAL,
    REACT_APP_AUTH_URL_LOCAL: process.env.REACT_APP_AUTH_URL_LOCAL,
  },
  distDir: 'build'
}

module.exports = nextConfig
