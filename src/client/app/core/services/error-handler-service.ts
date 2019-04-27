import * as Sentry from '@sentry/browser';

class ErrorHandler {
  private error: string | null = null;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
          new Sentry.Integrations.Breadcrumbs({
            console: true, // Log calls to `console.log`, `console.debug`, etc
            dom: true, // Log all click and keypress events
            fetch: true, // Log HTTP requests done with the Fetch API
            history: true, // Log calls to `history.pushState` and friends
            sentry: true, // Log whenever we send an event to the server
            xhr: true, // Log HTTP requests done with the XHR API
          }),
        ],
      });
    }
  }

  throw(error: any): void {
    if (!(error instanceof Error)) {
      error = new Error(error);
    }

    this.error = error;
    throw error;
  }

  getLastError(): string | null {
    return this.error;
  }
}

export const errorHandlerService = new ErrorHandler();
