import "normalize.css";
import "./assets/index.scss";
import { render } from "lit-html";

import home from "./app/home";
import error from "./app/error";

import { browserRouter } from "prouter";

const router = browserRouter();

router
  .use("/", (_req, resp) => {
    render(home, document.body);
    resp.end();
  })
  .use("*", (_req, resp) => {
    render(error, document.body);
    resp.end();
  });

router.listen();

export default router;
