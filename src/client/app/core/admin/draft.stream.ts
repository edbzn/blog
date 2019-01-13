import * as flyd from "flyd";
import { StateUpdateFunction, DraftState } from "./types";
import { draft } from "./draft.store";

const update = flyd.stream<StateUpdateFunction>();
const updateState = (state: DraftState, patch: StateUpdateFunction) =>
  patch(state);

export const actions = draft.actions(update);
export const states = flyd.scan<DraftState, StateUpdateFunction>(
  updateState,
  draft.initialState(),
  update,
);
