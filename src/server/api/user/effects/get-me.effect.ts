import { HttpEffect, HttpError, HttpStatus } from "@marblejs/core";
import { throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { getMe } from "../helpers/get-me";
import { throwIfNotAdmin } from "../helpers/throw-if-not-admin";

export const getMeEffect$: HttpEffect = req$ =>
  req$.pipe(
    mergeMap(getMe),
    mergeMap(throwIfNotAdmin),
    map(user => ({ body: user })),
    catchError(err =>
      throwError(() =>
        err instanceof HttpError
          ? err
          : new HttpError("User does not exist", HttpStatus.NOT_FOUND),
      ),
    ),
  );
