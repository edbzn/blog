import * as Sentry from '@sentry/browser';

if (process.env.PRODUCTION) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Breadcrumbs({
      beacon: true,  // Log HTTP requests done with the Beacon API
      console: true, // Log calls to `console.log`, `console.debug`, etc
      dom: true,     // Log all click and keypress events
      fetch: true,   // Log HTTP requests done with the Fetch API
      history: true, // Log calls to `history.pushState` and friends
      sentry: true,  // Log whenever we send an event to the server
      xhr: true,     // Log HTTP requests done with the XHR API
    })],
  });
}
