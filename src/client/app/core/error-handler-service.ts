import * as Sentry from "@sentry/browser";

import router from "../../app-router";

class ErrorHandler {
  private error: string = "";

  constructor() {
    if (process.env.NODE_ENV === "production") {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
          new Sentry.Integrations.Breadcrumbs({
            beacon: true, // Log HTTP requests done with the Beacon API
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

  throw(error: string): void {
    this.error = error;
    console.error(error);
  }

  throwAndRedirect(error: string): void {
    this.throw(error);
    router.push("/error");
  }

  getLastError(): string {
    return this.error;
  }
}

export const errorHandlerService = new ErrorHandler();
