import { combineRoutes, EffectFactory } from "@marblejs/core";
import { loginEffect$ } from "./effects/login.effect";
import { signupEffect$ } from "./effects/signup.effect";

const login$ = EffectFactory.matchPath("/login")
  .matchType("POST")
  .use(loginEffect$);

const signup$ = EffectFactory.matchPath("/signup")
  .matchType("POST")
  .use(signupEffect$);

export const auth$ = combineRoutes("/auth", [login$]);
