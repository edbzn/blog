import { requestValidator$, t } from '@marblejs/middleware-io';

import { SortDir } from '../../../utils/collection';
import {
  CollectionQueryValidatorOpts,
  createQuery,
} from '../../../utils/collection-query.validator';

export interface ArticleCollectionQueryOpts extends CollectionQueryValidatorOpts {
  tags?: string | string[];
}

export const articleCollectionQuery = (options: ArticleCollectionQueryOpts) =>
  t.intersection([
    createQuery(options),
    t.type({
      tags: t.union([t.string, t.array(t.string), t.undefined]),
    }),
  ]);

export const defaultArticleQuery: ArticleCollectionQueryOpts = {
  page: 1,
  limit: 4,
  sortBy: ['_id', 'createdAt'],
  sortDir: SortDir.DESC,
};

const queryReturnType = articleCollectionQuery(defaultArticleQuery);

export type ArticleCollectionQueryPayload = t.TypeOf<typeof queryReturnType>;

export const articleQueryValidator$ = (options: ArticleCollectionQueryOpts = defaultArticleQuery) =>
  requestValidator$({
    query: articleCollectionQuery(options),
  });
