import { HttpEffect } from '@marblejs/core';
import { flatMap, map } from 'rxjs/operators';

import { getMe } from '../helpers/get-me';
import { throwIfNotAdmin } from '../helpers/throw-if-not-admin';
import { UserDao } from '../model/user.dao';

export const getUsersEffect$: HttpEffect = req$ =>
  req$.pipe(
    flatMap(getMe),
    flatMap(throwIfNotAdmin),
    flatMap(UserDao.findAllPublic),
    map(body => ({ body }))
  );
