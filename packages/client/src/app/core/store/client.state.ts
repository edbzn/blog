import { Article } from '../../components/admin/types';

export interface ClientState {
  articles: Article[];
  articlesByTag: {
    [tag: string]: Article[];
  };
  moreResult: boolean;
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export const initialState = (): ClientState => ({
  articles: [],
  articlesByTag: {},
  page: 1,
  limit: 8,
  moreResult: true,
  loading: true,
  error: null,
});
