import { HttpEffect } from '@marblejs/core';
import { flatMap, map } from 'rxjs/operators';

import { UserDao } from '../model/user.dao';

export const getUsersEffect$: HttpEffect = req$ =>
  req$.pipe(
    flatMap(UserDao.findAllPublic),
    map(body => ({ body })),
  );
