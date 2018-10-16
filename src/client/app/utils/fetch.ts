function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export async function _fetch(input: Request | string, init?: RequestInit) {
  return await fetch(input, init).then(handleErrors);
}

export default _fetch;
