import { ArticleLanguage } from "../../../../../server/api/article/model/article-language";

import { DraftState } from "./types";

export const initialState = (): DraftState => ({
  id: null,
  editor: null,
  draft: {
    title: "Brouillon",
    slug: "brouillon",
    markdown: "",
    html: "",
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
