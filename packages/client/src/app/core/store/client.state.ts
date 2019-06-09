import { Article } from '../../components/admin/types';

export interface ClientState {
  articles: Article[];
  moreResult: boolean;
  loading: boolean;
  error: null | string;
}

export const initialState = (): ClientState => ({
  articles: [],
  moreResult: true,
  loading: true,
  error: null,
});
