import { Joi, validator$ } from "@marblejs/middleware-joi";

export const credentialsValidator$ = validator$({
  body: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
