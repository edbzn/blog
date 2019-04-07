import { HttpError, HttpStatus } from '@marblejs/core';
import { forkJoin, iif, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { InstanceType } from 'typegoose';

import { User } from '../../user/model/user.model';
import { CredentialsPayload } from '../effects/login.effect';
import { compare$ } from '../helpers/hash';
import { getUser } from './get-user-by-email';

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

export const checkPassword = (body: CredentialsPayload) =>
  combineHashAndPassword(body).pipe(
    mergeMap(compareHashAndPassword),
    mergeMap(throwIfUnauthorized(body)),
  );
