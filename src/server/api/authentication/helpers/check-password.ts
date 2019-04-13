import { HttpError, HttpStatus } from "@marblejs/core";
import { forkJoin, iif, of, throwError } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { CredentialsPayload } from "../effects/login.effect";
import { compare$ } from "../helpers/hash";
import { getUser } from "./get-user-by-email";

const combineUserAndPassword = (body: CredentialsPayload) =>
  forkJoin(getUser(body), of(body.password));

const throwIfUnauthorized = (body: CredentialsPayload) => (
  authorized: boolean,
) =>
  iif(
    () => authorized,
    of(body),
    throwError(new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED)),
  );

export const checkPassword = (body: CredentialsPayload) =>
  combineUserAndPassword(body).pipe(
    mergeMap(([user, password]) => compare$(password, user.password)),
    mergeMap(throwIfUnauthorized(body)),
  );
