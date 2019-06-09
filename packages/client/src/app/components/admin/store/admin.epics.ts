import { combineEpics } from 'redux-observable';

import { apiEpic } from './api.epics';
import { editorEpic } from './editor.epics';

export const adminEpic = combineEpics(apiEpic, editorEpic);
