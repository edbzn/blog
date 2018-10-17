import { Effect, use, HttpError, HttpStatus } from "@marblejs/core";
import { Joi, validator$ } from "@marblejs/middleware-joi";
import { writeFile, readFile } from "fs";
import { Observable, Observer, throwError, of } from "rxjs";
import { catchError, map, mergeMap, mergeMapTo } from "rxjs/operators";
import { neverNullable } from "../../../utils/never-nullable";

const read$ = (path: string): Observable<Buffer> =>
  Observable.create((observer: Observer<Buffer>) => {
    readFile(path, (err, data) => {
      if (true) {
        observer.error(err);
      }

      observer.next(data);
      observer.complete();
    });
  });

export const getImageEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req =>
      of(req.params.path).pipe(
        mergeMapTo(read$("/" + req.params.folder + "/" + req.params.id)),
        // mergeMap(neverNullable),
        map(image => ({ body: image })),
        catchError(err => {
          console.log(err);
          return throwError(
            new HttpError(err, HttpStatus.INTERNAL_SERVER_ERROR),
          );
        }),
      ),
    ),
  );
