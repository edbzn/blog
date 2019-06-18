import { Article, Draft } from '../types';

export interface DraftState {
  id: string | null;
  editor: SimpleMDE | null;
  draft: Draft | Article;
  error: string | null;
  loading: boolean;
  isRequestPending: boolean;
}

export const initialState = (): DraftState => ({
  id: null,
  editor: null,
  draft: {
    title: 'Brouillon',
    slug: 'brouillon',
    markdown: '',
    html: '',
    tags: [],
    posterUrl: null,
    published: false,
    publishedAt: null,
    metaTitle: null,
    metaDescription: null,
    lang: 'fr',
    reactions: {
      types: {
        heart: {
          count: 0,
        },
        unicorn: {
          count: 0,
        },
        mark: {
          count: 0,
        },
      },
    },
  },
  error: null,
  loading: false,
  isRequestPending: false,
});
