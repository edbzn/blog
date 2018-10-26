import { ProuterResponse, ProuterBrowserRouter } from "prouter";

export const unAuthenticatedErrorMsg = `<strong>You're trying to access a private zone.</strong> <br> <br>
If you find a security whole and consider yourself as a good person, <a href="https://twitter.com/edouardbozon">please DM me</a>`;

export function redirectAndShowError(
  router: ProuterBrowserRouter,
  error: string,
  resp: ProuterResponse,
): void {
  router.push(`/error?message=${encodeURIComponent(error)}`);
  resp.end();
}
