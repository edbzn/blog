import { IResource, ITimeStampableResource } from "../../utils/resource";
import { ArticleLanguage } from "../../../../server/api/article/model/article-language";

export interface IDraft {
  title: string;
  markdown: string;
  html: string;
  tags: string[];
  published: boolean;
  posterUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  lang: ArticleLanguage;
}

export interface IArticle extends IDraft, IResource, ITimeStampableResource {}

export interface DraftState {
  id: null | string;
  editor: null | SimpleMDE;
  draft: IDraft | IArticle;
  error: string | null;
  draftLoaded: boolean;
}

export interface DraftActions {
  reset(): void;
  setId(id: string): void;
  initEditor(element: HTMLTextAreaElement, initialValue: string): void;
  fetch(id: string): Promise<IArticle>;
  update(id: string, draft: IArticle): Promise<IArticle>;
  uploadPoster(id: string, file: File): Promise<void>;
  post(draft: IDraft): Promise<IArticle>;
  publish(): void;
  dePublish(): void;
  removePoster(): void;
  transformMarkdownToHtml(): void;
  editTitle(title: string): void;
  editMetaTitle(metaTitle: string): void;
  editMetaDescription(metaDescription: string): void;
  editTags(tags: string): void;
  editLang(lang: ArticleLanguage): void;
}

export interface StateUpdateFunction {
  (state: DraftState): DraftState;
}
