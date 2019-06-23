import { Article } from '../../components/admin/types';
import { ResourceCollection } from '../../utils/collection';

export const LOAD_ARTICLES = '[CLIENT] LOAD_ARTICLES';
export const LOAD_ARTICLES_SUCCESS = '[CLIENT] LOAD_ARTICLES_SUCCESS';
export const CLEAR_ARTICLES = '[CLIENT] CLEAR_ARTICLES';

export interface ArticleQuery {
  page: number;
  limit: number;
  tags?: string[];
}

export const loadArticles = ({ page, limit, tags }: ArticleQuery) => ({
  type: LOAD_ARTICLES,
  payload: { limit, page, tags },
});

export const loadArticlesFulfilled = (response: ResourceCollection<Article>) => ({
  type: LOAD_ARTICLES_SUCCESS,
  payload: response,
});

export const clearArticles = () => ({ type: CLEAR_ARTICLES });
