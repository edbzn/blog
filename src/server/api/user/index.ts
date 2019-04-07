import { combineRoutes, EffectFactory } from "@marblejs/core";
import { authorize$ } from "../authentication/middlewares/auth.middleware";
import { getMeEffect$ } from "./effects/get-me.effect";
import { getUsersEffect$ } from "./effects/get-users.effect";

export const getUsers$ = EffectFactory.matchPath("/")
  .matchType("GET")
  .use(getUsersEffect$);

export const getMe$ = EffectFactory.matchPath("/me")
  .matchType("GET")
  .use(getMeEffect$);

export const user$ = combineRoutes("/user", {
  effects: [getUsers$, getMe$],
  middlewares: [authorize$],
});
