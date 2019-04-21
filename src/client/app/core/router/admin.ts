import { html, render } from "lit-html";
import { routerGroup } from "prouter";

import { appSelector, router } from ".";
import { loadAdmin } from "../../../lazyload";
import { actions, states } from "../../components/admin/draft.stream";
import { unAuthenticatedErrorMsg } from "../../utils/unauthenticated-error";
import { authService } from "../services/authentication-service";
import { errorHandlerService } from "../services/error-handler-service";

export const adminRoutes = routerGroup()
  .use("/", async (_req, resp) => {
    await loadAdmin();

    render(
      html`
        <ez-admin></ez-admin>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("/draft", async (req, resp) => {
    await loadAdmin();

    const id = req.query.id;
    if (id) {
      actions.setId(id);
    }

    render(
      html`
        <ez-draft .actions="${actions}" .states="${states}"></ez-draft>
      `,
      appSelector,
    );
    resp.end();
  })
  .use("*", (_req, resp, next) => {
    if (!authService.authenticated) {
      errorHandlerService.throw(unAuthenticatedErrorMsg);
      router.push("/error");
      resp.end();
      return;
    }
    next();
  });
