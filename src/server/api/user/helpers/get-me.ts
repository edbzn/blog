import { HttpRequest } from '@marblejs/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { neverNullable } from '../../../utils/never-nullable';
import { UserDao } from '../model/user.dao';

export const getMe = (req: HttpRequest) =>
  of(req).pipe(
    map(req => req.user._id),
    mergeMap(UserDao.findById),
    mergeMap(neverNullable)
  );
