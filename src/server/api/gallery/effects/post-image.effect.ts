import { Effect, use } from "@marblejs/core";
import { validator$, Joi } from "@marblejs/middleware-joi";
import { map, mergeMap } from "rxjs/operators";
import * as multer from "multer";

multer({ dest: "uploads/" });

const imageValidator$ = validator$({
  body: Joi.object({
    title: Joi.binary(),
  }),
});

export const postImageEffect$: Effect = req$ =>
  req$.pipe(
    use(imageValidator$),
    map(req => req.body),
    // mergeMap(req => {
    // }),
    map(response => ({ body: response })),
  );
