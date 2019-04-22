import * as flyd from 'flyd';

import { DraftState } from './draft.initialState';
import { draftActions } from './draft.actions';

export interface StateUpdateFunction {
  (state: DraftState): DraftState;
}

const update = flyd.stream<StateUpdateFunction>();
const updateState = (state: DraftState, patch: StateUpdateFunction) => patch(state);

export const actions = draftActions.actions(update);
export const states = flyd.scan<DraftState, StateUpdateFunction>(
  updateState,
  draftActions.initialState(),
  update
);
