import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { generateToken } from '@marblejs/middleware-jwt';
import { forkJoin, iif, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Config } from '../../../config';
import { neverNullable } from '../../../utils/never-nullable';
import { UserDao } from '../../user/model/user.dao';
import { credentialsValidator$ } from '../helpers/credentials.validator';
import { compare$ } from '../helpers/hash';
import { generateTokenPayload } from '../helpers/token.helper';

export const loginEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(credentialsValidator$),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(body =>
          forkJoin(
            UserDao.findByEmail(body.email).pipe(mergeMap(neverNullable)),
            of(body.password),
          ),
        ),
        mergeMap(data => {
          return compare$(data[1], data[0].password);
        }),
        mergeMap(isUser =>
          iif(
            () => isUser,
            UserDao.findByEmail(req.body.email),
            throwError("Unauthorized"),
          ),
        ),
        mergeMap(neverNullable),
        map(generateTokenPayload),
        map(generateToken({ secret: Config.jwt.secret })),
        map(token => ({ body: { token } })),
        catchError(err => {
          return throwError(
            new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED),
          );
        }),
      ),
    ),
  );
