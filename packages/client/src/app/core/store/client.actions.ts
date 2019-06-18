import { Article } from '../../components/admin/types';
import { ResourceCollection } from '../../utils/collection';

export const LOAD_ARTICLES = '[CLIENT] LOAD_ARTICLES';
export const LOAD_ARTICLES_SUCCESS = '[CLIENT] LOAD_ARTICLES_SUCCESS';

export const loadArticles = ({ page, limit }: { page: number; limit: number }) => ({
  type: LOAD_ARTICLES,
  payload: { limit, page },
});

export const loadArticlesFulfilled = (response: ResourceCollection<Article>) => ({
  type: LOAD_ARTICLES_SUCCESS,
  payload: response,
});
