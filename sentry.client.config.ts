import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://90495f66481138cddbd27cbc9eda3c42@o4508246120595456.ingest.de.sentry.io/4508246123806800",
  ignoreErrors: [/^NEXT_REDIRECT$/], // ignore nextjs redirect errors
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
