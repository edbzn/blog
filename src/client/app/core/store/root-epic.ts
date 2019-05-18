import { combineEpics } from 'redux-observable';

import { adminEpic } from '../../components/admin/store/admin.epics';

export const rootEpic = combineEpics(adminEpic);
