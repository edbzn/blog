import { Joi, validator$ } from "@marblejs/middleware-joi";

export const articleValidator$ = validator$({
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    posterUrl: Joi.string().required(),
    tags: Joi.array().required(),
    published: Joi.boolean().required(),
    publishedAt: Joi.required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    _id: Joi.string(),
    __v: Joi.number(),
  }),
});
