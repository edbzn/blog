import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { neverNullable } from '../../../utils/never-nullable';
import { UserDao } from '../model/user.dao';

export const getMeEffect$: HttpEffect = req$ =>
  req$.pipe(
    map(req => req.user._id),
    mergeMap(UserDao.findById),
    mergeMap(neverNullable),
    map(user => ({ body: user })),
    catchError(() =>
      throwError(new HttpError("User does not exist", HttpStatus.NOT_FOUND)),
    ),
  );
