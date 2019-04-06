import { Joi, validator$ } from "@marblejs/middleware-joi";
import { ArticleLanguage } from "../model/article-language";

export const articleValidator$ = validator$({
  body: Joi.object({
    title: Joi.string().required(),
    markdown: Joi.string().allow(["", null]),
    html: Joi.string().allow(["", null]),
    tags: Joi.array().required(),
    slug: Joi.string(),
    published: Joi.boolean().required(),
    publishedAt: Joi.date().allow(null),
    posterUrl: Joi.string().allow(null),
    metaTitle: Joi.string().allow(null),
    metaDescription: Joi.string().allow(null),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    lang: Joi.string().only([ArticleLanguage.FR, ArticleLanguage.EN]),
    _id: Joi.string(),
    __v: Joi.number(),
  }),
});
