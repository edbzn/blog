import { resolve } from "path";

export const PUBLIC_PATH = process.env.production
  ? resolve(__dirname, "data") // @todo find better location (it will throw)
  : "/tmp/";

export function getPublicPath(filename: string): string {
  return PUBLIC_PATH + filename;
}
