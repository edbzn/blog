import { ArticleLanguage } from '../../../../server/api/article/model/article-language';
import { Article, Draft } from './types';

export interface DraftState {
  id: null | string;
  editor: null | SimpleMDE;
  draft: Draft | Article;
  error: string | null;
  draftLoaded: boolean;
  loading: boolean;
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
    lang: ArticleLanguage.FR,
  },
  error: null,
  draftLoaded: false,
  loading: false,
});
