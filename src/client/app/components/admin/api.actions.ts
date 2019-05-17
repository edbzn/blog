import { v1 as uuid } from 'uuid';

import { apiClient } from '../../core/services/api-client';
import { storageService } from '../../core/services/storage-client';
import { DraftState } from './draft.initialState';
import { Article, Draft } from './types';
import { StateUpdateFunction } from './draft.stream';

export interface ApiActions {
  get(id: string): Promise<Article>;
  update(id: string, draft: Article): Promise<Article>;
  post(draft: Draft): Promise<Article>;
  uploadPoster(slug: string, file: File): Promise<void>;
}

export const apiActions = (update: flyd.Stream<StateUpdateFunction>): ApiActions => ({
  get(id: string): Promise<Article> {
    return new Promise((resolve, reject) => {
      apiClient
        .get<Article>(`/api/v1/article/${id}`)
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
  update(id: string, draft: Article): Promise<Article> {
    update((state: DraftState) => {
      state.loading = true;
      return state;
    });

    return new Promise((resolve, reject) => {
      apiClient
        .put<Article>(`/api/v1/article/${id}`, draft)
        .then(updatedDraft => {
          update((state: DraftState) => {
            state.loading = false;
            return state;
          });
          resolve(updatedDraft);
        })
        .catch(err => {
          update((state: DraftState) => {
            state.error = err;
            state.loading = false;
            return state;
          });
          reject(err);
        });
    });
  },
  post(draft: Draft): Promise<Article> {
    return new Promise((resolve, reject) => {
      apiClient
        .post<Article>(`/api/v1/article`, draft)
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
  uploadPoster(slug: string = 'draft', file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const filename = slug + '-' + uuid().slice(0, 5);

      storageService
        .upload(filename, file)
        .then(response => {
          const { path } = response;
          update((state: DraftState) => {
            state.draft.posterUrl = path;
            return state;
          });
          resolve();
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
});
