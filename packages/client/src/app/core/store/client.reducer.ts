import { ClientState, initialState } from './client.state';
import { LOAD_ARTICLES_SUCCESS } from './client.actions';

const findById = ({ _id }: { _id: string }) => <T extends { _id: string }>(target: T): boolean =>
  _id === target._id;

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

    default:
      return state;
  }
}
