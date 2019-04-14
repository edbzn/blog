import { ApiActions, apiActions } from "./api.actions";
import { DraftState, initialState } from "./draft.initialState";
import { EditorActions, editorActions } from "./editor.actions";
import { FormActions, formActions } from "./form.actions";
import { StateUpdateFunction } from "./draft.stream";

export interface DraftActions extends ApiActions, EditorActions, FormActions {
  reset(): void;
  setId(id: string): void;
}

export const draft = {
  initialState: (): DraftState => ({ ...initialState() }),
  actions: (update: flyd.Stream<StateUpdateFunction>): DraftActions => ({
    ...editorActions(update),
    ...formActions(update),
    ...apiActions(update),
    reset() {
      update(() => ({ ...initialState() }));
    },
    setId(id: string) {
      update((state: DraftState) => {
        state.id = id;
        return state;
      });
    },
  }),
};
