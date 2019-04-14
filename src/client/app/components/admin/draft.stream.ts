import * as flyd from "flyd";

import { DraftState } from "./draft.initialState";
import { draft } from "./draft.store";

export interface StateUpdateFunction {
  (state: DraftState): DraftState;
}

const update = flyd.stream<StateUpdateFunction>();
const updateState = (state: DraftState, patch: StateUpdateFunction) =>
  patch(state);

export const actions = draft.actions(update);
export const states = flyd.scan<DraftState, StateUpdateFunction>(
  updateState,
  draft.initialState(),
  update,
);
