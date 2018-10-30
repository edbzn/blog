import { Joi, validator$ } from "@marblejs/middleware-joi";

export const articleValidator$ = validator$({
  body: Joi.object({
    title: Joi.string().required(),
    markdown: Joi.string().required(),
    html: Joi.string().required(),
    posterUrl: Joi.string().required(),
    tags: Joi.array().required(),
    published: Joi.boolean().required(),
    publishedAt: Joi.required(),
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    _id: Joi.string(),
    __v: Joi.number(),
  }),
});
