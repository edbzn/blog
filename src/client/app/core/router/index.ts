import { browserRouter, ProuterNavigationEvent } from 'prouter';

import { errorHandlerService } from '../services/error-handler-service';
import { adminRoutes } from './admin';
import { clientRoutes } from './client';

export const appSelector = document.getElementById("app")!;
export const router = browserRouter();

router
  .use("/", clientRoutes)
  .use("/admin", adminRoutes)
  .use("*", (_req, resp) => {
    errorHandlerService.throw("Heuuu, cette page n'existe pas...");
    router.push("/error");
    resp.end();
  })
  .listen();

router.on("navigation", (_e: ProuterNavigationEvent) => {
  window.scrollTo({ top: 0 });
});
