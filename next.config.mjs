import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default withSentryConfig(nextConfig, {
  org: "akhil-ae",
  project: "javascript-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
  hideSourceMaps: true,
  disableLogger: true,
});
