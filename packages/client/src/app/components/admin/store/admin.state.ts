import { defaultReactions } from '../../../../../../server/src/api/article/model/article-reactions';
import { ArticleLanguage } from '../../../../../../server/src/api/article/model/article-language';
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
    lang: ArticleLanguage.FR,
    reactions: defaultReactions,
  },
  error: null,
  loading: false,
  isRequestPending: false,
});
