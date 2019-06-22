import { Article } from '../../components/admin/types';
import { ResourceCollection } from '../../utils/collection';

export const LOAD_ARTICLES = '[CLIENT] LOAD_ARTICLES';
export const LOAD_ARTICLES_SUCCESS = '[CLIENT] LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_BY_TAG = '[CLIENT] LOAD_ARTICLES_BY_TAG';
export const LOAD_ARTICLES_BY_TAG_SUCCESS = '[CLIENT] LOAD_ARTICLES_BY_TAG_SUCCESS';

export interface ArticleQuery {
  page: number;
  limit: number;
  tag?: string;
}

export const loadArticles = ({ page, limit }: ArticleQuery) => ({
  type: LOAD_ARTICLES,
  payload: { limit, page },
});

export const loadArticlesFulfilled = (response: ResourceCollection<Article>) => ({
  type: LOAD_ARTICLES_SUCCESS,
  payload: response,
});

export const loadArticlesByTag = ({ page, limit, tag }: ArticleQuery) => ({
  type: LOAD_ARTICLES,
  payload: { limit, page, tag },
});

export const loadArticlesByTagFulfilled = (response: ResourceCollection<Article>) => ({
  type: LOAD_ARTICLES_SUCCESS,
  payload: response,
});
