import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://90495f66481138cddbd27cbc9eda3c42@o4508246120595456.ingest.de.sentry.io/4508246123806800",
  tracesSampleRate: 1.0,
});
