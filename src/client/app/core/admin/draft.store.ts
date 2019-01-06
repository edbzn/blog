import * as flyd from "flyd";
import SimpleMDE from "simplemde";

import { IDraft, IArticle } from "./types";
import { apiClient } from "../api-client";

export interface DraftState {
  id: null | string;
  editor: null | SimpleMDE;
  draft: IDraft;
  error: string | null;
  draftLoaded: boolean;
  dirty: boolean;
}

export interface DraftActions {
  updateDraft(): void;
  publish(): void;
  dePublish(): void;
  submitDraft(): void;
  initEditor(element: HTMLTextAreaElement, initialValue: string): void;
  fetchArticle(id: string): Promise<IArticle>;
  setArticleId(id: string): void;
}

export interface StateUpdateFunction {
  (state: DraftState): DraftState;
}

function postDraft(article: IDraft): Promise<IArticle> {
  return apiClient.post<IArticle>("/api/v1/article", article);
}

function updateArticle(id: string, article: IArticle): Promise<IArticle> {
  return apiClient.put<IArticle>(`/api/v1/article/${id}`, article);
}

// function uploadPoster(file: File) {
//   return storageService.upload(this.id || "draft" + "-" + uuid(), file);
// }

const draft = {
  initialState: (): DraftState => ({
    id: null,
    editor: null,
    draft: {
      title: "Brouillon",
      markdown: "",
      html: "",
      tags: [],
      posterUrl: null,
      published: false,
      publishedAt: null,
      metaTitle: null,
      metaDescription: null,
    },
    error: null,
    draftLoaded: false,
    dirty: false,
  }),
  actions: (update: flyd.Stream<StateUpdateFunction>): DraftActions => ({
    setArticleId(id: string) {
      update((state: DraftState) => {
        state.id = id;
        return state;
      });
    },
    fetchArticle(id: string): Promise<IArticle> {
      return new Promise((resolve, reject) => {
        apiClient.get<IArticle>(`/api/v1/article/${id}`)
          .then(article => {
            update((state: DraftState) => {
              state.draft = article;
              state.draftLoaded = true;
              return state;
            });
            resolve(article);
          })
          .catch(err => {
            update((state: DraftState) => {
              state.error = err;
              return state;
            });
            reject(err);
          });
      });
    },
    initEditor(element: HTMLTextAreaElement, initialValue: string) {
      update((state: DraftState) => {
        state.editor = new SimpleMDE({
          lineWrapping: true,
          element,
          initialValue,
          spellChecker: false,
          autoDownloadFontAwesome: true,
          forceSync: false,
          tabSize: 2,
          autosave: {
            enabled: false,
            uniqueId: "editor",
          },
          autofocus: true,
        });
        return state;
      });
    },
    publish() {
      update((state: DraftState) => {
        return state;
      });
    },
    dePublish() {
      update((state: DraftState) => {
        return state;
      });
    },
    submitDraft() {
      update((state: DraftState) => {
        return state;
      });
    },
    updateDraft() {
      update((state: DraftState) => {
        return state;
      });
    },
  }),
};

const update = flyd.stream<StateUpdateFunction>();
const updateState = (state: DraftState, patch: StateUpdateFunction) =>
  patch(state);

export const actions = draft.actions(update);
export const states = flyd.scan<DraftState, StateUpdateFunction>(
  updateState,
  draft.initialState(),
  update,
);
