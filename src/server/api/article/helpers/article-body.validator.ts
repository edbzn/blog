import { requestValidator$, t } from '@marblejs/middleware-io';

import { ArticleLanguage } from '../model/article-language';

export const articleSchema = t.type({
  title: t.string,
  markdown: t.string,
  html: t.string,
  tags: t.array(t.string),
  slug: t.union([t.string, t.null]),
  published: t.boolean,
  publishedAt: t.union([t.string, t.null]),
  posterUrl: t.union([t.string, t.null]),
  metaTitle: t.union([t.string, t.null]),
  metaDescription: t.union([t.string, t.null]),
  lang: t.union([t.literal(ArticleLanguage.FR), t.literal(ArticleLanguage.EN)]),
});

export type ArticlePayload = t.TypeOf<typeof articleSchema>;

export const articleValidator$ = requestValidator$({ body: articleSchema });
