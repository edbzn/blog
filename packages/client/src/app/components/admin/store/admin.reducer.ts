import { FAILURE } from '../../../core/store/common.actions';
import { slugify } from '../../../shared/slugify';
import { DraftState, initialState } from './admin.state';
import {
  CLEAR_DRAFT,
  CREATE_DRAFT,
  CREATE_DRAFT_SUCCESS,
  LOAD_DRAFT,
  LOAD_DRAFT_SUCCESS,
  UPDATE_DRAFT,
  UPDATE_DRAFT_SUCCESS,
  UPLOAD_POSTER,
  UPLOAD_POSTER_SUCCESS,
} from './api.actions';
import {
  CONVERT_MD_TO_HTML,
  DE_PUBLISH,
  EDIT_LANG,
  EDIT_MARKDOWN,
  EDIT_META_DESCRIPTION,
  EDIT_META_TITLE,
  EDIT_SLUG,
  EDIT_TAGS,
  EDIT_TITLE,
  LOAD_EDITOR_SUCCESS,
  PUBLISH,
  REMOVE_POSTER,
} from './editor.actions';

export function admin(state = initialState(), action: any): DraftState {
  switch (action.type) {
    case LOAD_DRAFT:
      return {
        ...state,
        id: action.payload,
        loading: true,
      };

    case LOAD_DRAFT_SUCCESS:
      return {
        ...state,
        draft: action.payload,
        loading: false,
      };

    case UPLOAD_POSTER:
    case CREATE_DRAFT:
    case UPDATE_DRAFT:
      return {
        ...state,
        isRequestPending: true,
      };

    case UPLOAD_POSTER_SUCCESS:
      return {
        ...state,
        draft: {
          ...state.draft,
          posterUrl: action.payload,
        },
      };

    case CREATE_DRAFT_SUCCESS:
      return {
        ...state,
        draft: action.payload,
        isRequestPending: false,
        error: null,
        id: action.payload._id,
      };

    case UPDATE_DRAFT_SUCCESS:
      return {
        ...state,
        isRequestPending: false,
        error: null,
      };

    case EDIT_MARKDOWN:
      return {
        ...state,
        draft: { ...state.draft, markdown: action.payload },
      };

    case CONVERT_MD_TO_HTML:
      return {
        ...state,
        draft: { ...state.draft, html: action.payload },
      };

    case LOAD_EDITOR_SUCCESS:
      return {
        ...state,
        editor: action.payload,
      };

    case EDIT_TITLE:
      return {
        ...state,
        draft: {
          ...state.draft,
          title: action.payload.trim(),
        },
      };

    case EDIT_META_TITLE:
      return {
        ...state,
        draft: {
          ...state.draft,
          metaTitle: action.payload.trim(),
        },
      };

    case EDIT_META_DESCRIPTION:
      return {
        ...state,
        draft: {
          ...state.draft,
          metaDescription: action.payload.trim(),
        },
      };

    case EDIT_SLUG:
      return {
        ...state,
        draft: {
          ...state.draft,
          slug: slugify(action.payload),
        },
      };

    case EDIT_LANG:
      return {
        ...state,
        draft: {
          ...state.draft,
          lang: action.payload,
        },
      };

    case EDIT_TAGS:
      return {
        ...state,
        draft: {
          ...state.draft,
          tags: action.payload.split(','),
        },
      };

    case PUBLISH:
      return {
        ...state,
        draft: {
          ...state.draft,
          published: true,
          publishedAt: new Date().toString(),
        },
      };

    case DE_PUBLISH:
      return {
        ...state,
        draft: {
          ...state.draft,
          published: false,
          publishedAt: null,
        },
      };

    case CLEAR_DRAFT:
      return {
        ...state,
        draft: initialState().draft,
        editor: null,
        error: null,
        id: null,
      };

    case REMOVE_POSTER:
      return {
        ...state,
        draft: {
          ...state.draft,
          posterUrl: null,
        },
      };

    case FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isRequestPending: false,
      };

    default:
      return state;
  }
}
