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
  reset(): void;
  setId(id: string): void;
  initEditor(element: HTMLTextAreaElement, initialValue: string): void;
  fetch(id: string): Promise<IArticle>;
  update(id: string, draft: IArticle): Promise<IArticle>;
  post(draft: IDraft): Promise<IArticle>;
  publish(): void;
  dePublish(): void;
}

export interface StateUpdateFunction {
  (state: DraftState): DraftState;
}

// function uploadPoster(file: File) {
//   return storageService.upload(this.id || "draft" + "-" + uuid(), file);
// }

const initialState: DraftState = {
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
};

const draft = {
  initialState: (): DraftState => initialState,
  actions: (update: flyd.Stream<StateUpdateFunction>): DraftActions => ({
    reset() {
      update(() => {
        return initialState;
      });
    },
    setId(id: string) {
      update((state: DraftState) => {
        state.id = id;
        return state;
      });
    },
    fetch(id: string): Promise<IArticle> {
      return new Promise((resolve, reject) => {
        apiClient
          .get<IArticle>(`/api/v1/article/${id}`)
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
    update(id: string, draft: IArticle): Promise<IArticle> {
      return new Promise((resolve, reject) => {
        apiClient
          .put<IArticle>(`/api/v1/article/${id}`, draft)
          .then(updatedDraft => {
            update((state: DraftState) => {
              state.draft = updatedDraft;
              return state;
            });
            resolve(updatedDraft);
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
    post(draft: IDraft): Promise<IArticle> {
      return new Promise((resolve, reject) => {
        apiClient
          .post<IArticle>(`/api/v1/article`, draft)
          .then(postedDraft => {
            update((state: DraftState) => {
              state.draft = postedDraft;
              return state;
            });
            resolve(postedDraft);
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
