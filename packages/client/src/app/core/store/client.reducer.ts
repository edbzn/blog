import { findById } from '../../utils/findById';
import { LOAD_ARTICLES_SUCCESS } from './client.actions';
import { ClientState, initialState } from './client.state';
import { FAILURE } from './common.actions';

export function client(state = initialState(), action: any): ClientState {
  switch (action.type) {
    case LOAD_ARTICLES_SUCCESS:
      const articles = [
        ...state.articles.filter(article => !action.payload.collection.some(findById(article))),
        ...action.payload.collection,
      ];

      return {
        ...state,
        articles,
        loading: false,
        moreResult: action.payload.total > articles.length,
      };

    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message ? action.payload.message : action.payload,
      };

    default:
      return state;
  }
}
