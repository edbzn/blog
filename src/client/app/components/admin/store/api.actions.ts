import { Article, Draft } from '../types';

export const CLEAR_DRAFT = '[ADMIN] CLEAR_DRAFT';
export const LOAD_DRAFT = '[ADMIN] LOAD_DRAFT';
export const LOAD_DRAFT_SUCCESS = '[ADMIN] LOAD_DRAFT_SUCCESS';
export const CREATE_DRAFT = '[ADMIN] CREATE_DRAFT';
export const CREATE_DRAFT_SUCCESS = '[ADMIN] CREATE_DRAFT_SUCCESS';
export const UPDATE_DRAFT = '[ADMIN] UPDATE_DRAFT';
export const UPDATE_DRAFT_SUCCESS = '[ADMIN] UPDATE_DRAFT_SUCCESS';
export const REMOVE_DRAFT = '[ADMIN] REMOVE_DRAFT';
export const REMOVE_DRAFT_SUCCESS = '[ADMIN] REMOVE_DRAFT_SUCCESS';
export const UPLOAD_POSTER = '[ADMIN] UPLOAD_POSTER';
export const UPLOAD_POSTER_SUCCESS = '[ADMIN] UPLOAD_POSTER_SUCCESS';

export const clearDraft = () => ({ type: CLEAR_DRAFT });

export const loadDraft = (id: string) => ({ type: LOAD_DRAFT, payload: id });
export const loadDraftFulfilled = (draft: Draft) => ({ type: LOAD_DRAFT_SUCCESS, payload: draft });

export const createDraft = (draft: Draft) => ({ type: CREATE_DRAFT, payload: draft });
export const createDraftFulfilled = (draft: Draft) => ({
  type: CREATE_DRAFT_SUCCESS,
  payload: draft,
});

export const updateDraft = (draft: Article) => ({ type: UPDATE_DRAFT, payload: draft });
export const updateDraftFulfilled = (draft: Article) => ({
  type: UPDATE_DRAFT_SUCCESS,
  payload: draft,
});

export const removeDraft = (id: string) => ({ type: REMOVE_DRAFT, payload: id });
export const removeDraftFulfilled = (draft: Article) => ({
  type: REMOVE_DRAFT_SUCCESS,
  payload: draft,
});

export const uploadPoster = ({ slug, file }: { slug: string; file: File }) => ({
  type: UPLOAD_POSTER,
  payload: { slug, file },
});
export const uploadPosterFulfilled = (url: string) => ({
  type: UPLOAD_POSTER_SUCCESS,
  payload: url,
});
