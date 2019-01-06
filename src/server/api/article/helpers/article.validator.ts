import { Joi, validator$ } from "@marblejs/middleware-joi";

export const articleValidator$ = validator$({
  body: Joi.object({
    title: Joi.string().required(),
    markdown: Joi.string().required(),
    html: Joi.string().required(),
    tags: Joi.array().required(),
    published: Joi.boolean().required(),
    publishedAt: Joi.date().allow(null),
    posterUrl: Joi.string().allow(null),
    metaTitle: Joi.string().allow(null),
    metaDescription: Joi.string().allow(null),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    _id: Joi.string(),
    __v: Joi.number(),
  }),
});
