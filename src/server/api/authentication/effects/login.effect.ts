import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { throwIfNotAdmin } from '../../user/helpers/throw-if-not-admin';
import { checkPassword } from '../helpers/check-password';
import { getUser } from '../helpers/get-user-by-email';
import { generateTokenFromUser } from '../helpers/token.helper';

const credentialsSchema = t.type({
  email: t.string,
  password: t.string,
});

export type CredentialsPayload = t.TypeOf<typeof credentialsSchema>;

export const loginEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ body: credentialsSchema })),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(checkPassword),
        mergeMap(getUser),
        mergeMap(throwIfNotAdmin),
        mergeMap(generateTokenFromUser),
        map(token => ({ body: { token } })),
        catchError(() => throwError(new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED)))
      )
    )
  );
