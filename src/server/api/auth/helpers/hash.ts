import * as bcrypt from "bcrypt";
import { from } from "rxjs";

const createHash = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const createHash$ = (password: string) => from(createHash(password));
