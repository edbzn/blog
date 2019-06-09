import { Action } from 'redux';
import { combineEpics, ofType } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ArticleLanguage } from '../../../../../../server/src/api/article/model/article-language';
import { failure } from '../../../core/store/failure.action';
import { AppState } from '../../../core/store/state';
import { convertMdToHtml, EDIT_MARKDOWN, loadEditorFulfilled, LOAD_EDITOR } from './editor.actions';


const loadEditorModule$ = from(import(/* webpackChunkName: "app-editor" */ 'simplemde'));
const loadConverterModule$ = from(import(/* webpackChunkName: "app-converter" */ 'showdown'));

const configureEditor = (element: HTMLTextAreaElement, initialValue: string, state: AppState) => ({
  element,
  initialValue,
  lineWrapping: true,
  spellChecker: state.admin.draft.lang === ArticleLanguage.EN ? true : false,
  autoDownloadFontAwesome: true,
  forceSync: true,
  tabSize: 2,
  autofocus: true,
});

const editMarkdownEpic = (action$: Observable<any>): Observable<Action> =>
  action$.pipe(
    ofType(EDIT_MARKDOWN),
    switchMap(({ payload }) =>
      loadConverterModule$.pipe(
        map(converterModule => {
          const converter = new converterModule.default.Converter();
          return convertMdToHtml(converter.makeHtml(payload));
        }),
        catchError(err => of(failure(err)))
      )
    )
  );

const loadEditorEpic = (
  action$: Observable<any>,
  state$: Observable<AppState>
): Observable<Action> =>
  action$.pipe(
    ofType(LOAD_EDITOR),
    switchMap(({ payload: { element, initialValue } }) =>
      loadEditorModule$.pipe(
        withLatestFrom(state$),
        map(([markdownEditor, state]) =>
          loadEditorFulfilled(
            new markdownEditor.default(configureEditor(element, initialValue, state))
          )
        ),
        catchError(err => of(failure(err)))
      )
    )
  );

export const editorEpic = combineEpics(loadEditorEpic, editMarkdownEpic);
