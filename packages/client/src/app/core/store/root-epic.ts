import { combineEpics } from 'redux-observable';

import { adminEpic } from '../../components/admin/store/admin.epics';
import { clientEpic } from './client.epics';

export const rootEpic = combineEpics(adminEpic, clientEpic);
