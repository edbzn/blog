import { requestValidator$, t } from '@marblejs/middleware-io';

import { ArticleLanguage } from '../model/article-language';

interface PositiveBrand {
  readonly Positive: unique symbol;
}

const Positive = t.brand(
  t.number,
  (n): n is t.Branded<number, PositiveBrand> => n >= 0,
  'Positive'
);

type Positive = t.TypeOf<typeof Positive>;

export const articleSchema = t.type({
  title: t.string,
  markdown: t.string,
  html: t.string,
  tags: t.array(t.string),
  slug: t.string,
  published: t.boolean,
  publishedAt: t.union([t.string, t.null]),
  posterUrl: t.union([t.string, t.null]),
  metaTitle: t.union([t.string, t.null]),
  metaDescription: t.union([t.string, t.null]),
  reactions: t.type({
    types: t.type({
      unicorn: t.type({ count: Positive }),
      heart: t.type({ count: Positive }),
      mark: t.type({ count: Positive }),
    }),
  }),
  lang: t.union([t.literal(ArticleLanguage.FR), t.literal(ArticleLanguage.EN)]),
});

export type ArticlePayload = t.TypeOf<typeof articleSchema>;

export const articleValidator$ = requestValidator$({ body: articleSchema });
