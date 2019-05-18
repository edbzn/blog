import { Action } from 'redux';
import { combineEpics, ofType } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { apiClient, storageService } from '../../../core/services';
import { failure } from '../../../core/store/failure.action';
import { Article } from '../types';
import {
  CREATE_DRAFT,
  createDraftFulfilled,
  LOAD_DRAFT,
  loadDraftFulfilled,
  REMOVE_DRAFT,
  removeDraftFulfilled,
  UPDATE_DRAFT,
  updateDraftFulfilled,
  UPLOAD_POSTER,
  uploadPosterFulfilled,
} from './api.actions';

const loadDraftEpic = (action$: Observable<any>): Observable<Action> =>
  action$.pipe(
    ofType(LOAD_DRAFT),
    switchMap(action =>
      from(apiClient.get<Article>(`/api/v1/article/${action.payload}`)).pipe(
        map(response => loadDraftFulfilled(response)),
        catchError(err => of(failure(err)))
      )
    )
  );

const createDraftEpic = (action$: Observable<any>): Observable<Action> =>
  action$.pipe(
    ofType(CREATE_DRAFT),
    switchMap(action =>
      from(apiClient.post<Article>(`/api/v1/article`, action.payload)).pipe(
        map(response => createDraftFulfilled(response)),
        catchError(err => of(failure(err)))
      )
    )
  );

const updateDraftEpic = (action$: Observable<any>): Observable<Action> =>
  action$.pipe(
    ofType(UPDATE_DRAFT),
    switchMap(action =>
      from(apiClient.put<Article>(`/api/v1/article/${action.payload._id}`, action.payload)).pipe(
        map(response => updateDraftFulfilled(response)),
        catchError(err => of(failure(err)))
      )
    )
  );

const removeDraftEpic = (action$: Observable<any>): Observable<Action> =>
  action$.pipe(
    ofType(REMOVE_DRAFT),
    switchMap(action =>
      from(apiClient.delete(`/api/v1/article/${action.payload._id}`)).pipe(
        map(() => removeDraftFulfilled(action.payload)),
        catchError(err => of(failure(err)))
      )
    )
  );

const uploadPosterEpic = (action$: Observable<any>): Observable<Action> =>
  action$.pipe(
    ofType(UPLOAD_POSTER),
    switchMap(({ payload: { slug, file } }) =>
      from(storageService.upload(slug, file)).pipe(
        map(response => uploadPosterFulfilled({ slug, url: response.path })),
        catchError(err => of(failure(err)))
      )
    )
  );

export const apiEpic = combineEpics(
  loadDraftEpic,
  createDraftEpic,
  updateDraftEpic,
  removeDraftEpic,
  uploadPosterEpic
);
