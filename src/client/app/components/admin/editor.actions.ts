import { ArticleLanguage } from "../../../../server/api/article/model/article-language";
import { errorHandlerService } from "../../core/error-handler-service";
import { DraftState } from "./draft.initialState";
import { StateUpdateFunction } from "./draft.stream";

export interface EditorActions {
  initEditor(element: HTMLTextAreaElement, initialValue: string): void;
  transformMarkdownToHtml(): void;
}

export const editorActions = (
  update: flyd.Stream<StateUpdateFunction>,
): EditorActions => ({
  initEditor(element: HTMLTextAreaElement, initialValue: string) {
    import(/* webpackChunkName: "app-admin" */ "simplemde")
      .then(SimpleMDE => {
        update((state: DraftState) => {
          state.editor = new SimpleMDE.default({
            element,
            initialValue,
            lineWrapping: true,
            spellChecker:
              state.draft.lang === ArticleLanguage.EN ? true : false,
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
      })
      .catch(err => errorHandlerService.throw(err));
  },
  transformMarkdownToHtml() {
    import(/* webpackChunkName: "app-admin" */ "showdown")
      .then(showdown => {
        const converter = new showdown.Converter();
        update(state => {
          const markdown = state.editor!.value();
          const html = converter.makeHtml(markdown);
          state.draft.html = html;
          state.draft.markdown = markdown;
          return state;
        });
      })
      .catch(err => errorHandlerService.throw(err));
  },
});
