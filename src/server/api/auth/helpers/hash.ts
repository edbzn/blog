import * as bcrypt from "bcrypt";
import { from, Observable } from "rxjs";

const createHash = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const createHash$ = (password: string) => from(createHash(password));

const compare = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export const compare$ = (password: string, hash: string): Observable<boolean> =>
  from(compare(password, hash));
