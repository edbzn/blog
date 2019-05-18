import { ArticleLanguage } from '../../../../server/api/article/model/article-language';
import { slugify } from '../../shared/slugify';
import { DraftState } from './store/admin.state';
import { StateUpdateFunction } from './draft.stream';

export interface FormActions {
  publish(): void;
  dePublish(): void;
  editTitle(title: string): void;
  editMetaTitle(metaTitle: string): void;
  editMetaDescription(metaDescription: string): void;
  editTags(tags: string): void;
  editLang(lang: ArticleLanguage): void;
  editSlug(slug: string): void;
  removePoster(): void;
}

export const formActions = (update: flyd.Stream<StateUpdateFunction>): FormActions => ({
  editTitle(title: string) {
    update((state: DraftState) => {
      state.draft.title = title;
      return state;
    });
  },
  editSlug(slug: string) {
    update((state: DraftState) => {
      state.draft.slug = slugify(slug);
      return state;
    });
  },
  editMetaTitle(metaTitle: string) {
    update((state: DraftState) => {
      state.draft.metaTitle = metaTitle;
      return state;
    });
  },
  editMetaDescription(metaDescription: string) {
    update((state: DraftState) => {
      state.draft.metaDescription = metaDescription;
      return state;
    });
  },
  editTags(tags: string) {
    update((state: DraftState) => {
      state.draft.tags = tags.split(',');
      return state;
    });
  },
  editLang(lang: ArticleLanguage) {
    update((state: DraftState) => {
      state.draft.lang = lang;
      return state;
    });
  },
  removePoster() {
    update((state: DraftState) => {
      // @todo remove remote poster
      state.draft.posterUrl = null;
      return state;
    });
  },
  publish() {
    update((state: DraftState) => {
      state.draft.published = true;
      state.draft.publishedAt = new Date().toString();
      return state;
    });
  },
  dePublish() {
    update((state: DraftState) => {
      state.draft.published = false;
      state.draft.publishedAt = null;
      return state;
    });
  },
});
