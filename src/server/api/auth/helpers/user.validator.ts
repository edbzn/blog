import { Joi, validator$ } from "@marblejs/middleware-joi";

export const userValidator$ = validator$({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  }),
});
