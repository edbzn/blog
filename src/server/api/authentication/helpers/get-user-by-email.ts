import { mergeMap } from 'rxjs/operators';

import { neverNullable } from '../../../utils/never-nullable';
import { UserDao } from '../../user/model/user.dao';

export const getUser = ({ email }: { email: string }) =>
  UserDao.findByEmail(email).pipe(mergeMap(neverNullable));
