import { findById } from '../../utils/findById';
import { LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS, CLEAR_ARTICLES } from './client.actions';
import { ClientState, initialState } from './client.state';
import { FAILURE } from './common.actions';

export function client(state = initialState(), action: any): ClientState {
  switch (action.type) {
    case LOAD_ARTICLES:
      return {
        ...state,
        loading: true,
      };

    case LOAD_ARTICLES_SUCCESS:
      const articles = [...state.articles, ...action.payload.collection];
      return {
        ...state,
        loading: false,
        articles: [...state.articles, ...action.payload.collection],
        moreResult: action.payload.total > articles.length,
      };

    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message ? action.payload.message : action.payload,
      };

    case CLEAR_ARTICLES:
      return {
        ...state,
        articles: [],
      };

    default:
      return state;
  }
}
