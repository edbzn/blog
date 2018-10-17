import { combineRoutes, EffectFactory } from "@marblejs/core";
import { postImageEffect$ } from "./effects/post-image.effect";
import { getImageEffect$ } from "./effects/get-image.effect";

const postImage$ = EffectFactory.matchPath("/")
  .matchType("POST")
  .use(postImageEffect$);

const getImage$ = EffectFactory.matchPath("/:folder/:id")
  .matchType("GET")
  .use(getImageEffect$);

export const gallery$ = combineRoutes("/gallery", {
  effects: [getImage$, postImage$],
});
