import { router } from "../core/router";

// @todo params & query mapping
export const navigate = (link: string) => (e?: Event) => {
  if (e) {
    e.preventDefault();
  }

  router.push(link);
}
