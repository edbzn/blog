import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { forkJoin, iif, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InstanceType } from 'typegoose';

import { neverNullable } from '../../../utils/never-nullable';
import { UserDao } from '../../user/model/user.dao';
import { User } from '../../user/model/user.model';
import { generateTokenFromUser } from '../helpers/generate-token';
import { compare$ } from '../helpers/hash';

const credentialsSchema = t.type({
  email: t.string,
  password: t.string,
});

export type CredentialsPayload = t.TypeOf<typeof credentialsSchema>;

const getUser = ({ email }: { email: string }) =>
  UserDao.findByEmail(email).pipe(mergeMap(neverNullable));

const combineHashAndPassword = (body: CredentialsPayload) =>
  forkJoin(getUser(body), of(body.password));

const compareHashAndPassword = ([user, password]: [
  InstanceType<User>,
  string
]) => compare$(password, user.password);

const throwIfUnauthorized = (body: CredentialsPayload) => (
  authorized: boolean,
) =>
  iif(
    () => authorized,
    of(body),
    throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
  );

const checkPassword = (body: CredentialsPayload) =>
  combineHashAndPassword(body).pipe(
    mergeMap(compareHashAndPassword),
    mergeMap(throwIfUnauthorized(body)),
  );

export const loginEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(requestValidator$({ body: credentialsSchema })),
    mergeMap(req =>
      of(req).pipe(
        map(req => req.body),
        mergeMap(checkPassword),
        mergeMap(getUser),
        mergeMap(generateTokenFromUser),
        map(token => ({ body: { token } })),
        catchError(() =>
          throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
        ),
      ),
    ),
  );
