import { Joi, validator$ } from "@marblejs/middleware-joi";

export const commentValidator$ = validator$({
  body: Joi.object({
    author: Joi.string().required(),
    comment: Joi.string().required(),
    articleId: Joi.string().required(),
  }),
});
