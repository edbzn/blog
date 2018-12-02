async function handleErrors(response: Response) {
  if (!response.ok) {
    let error = response.statusText;

    try {
      let serverError = await response.json();
      if (serverError.error.message) {
        error = serverError.error.message;
      }
    } catch (error) {
      // do nothing
    }

    throw Error(error);
  }
  return response;
}

export async function _fetch(input: Request | string, init?: RequestInit) {
  return await fetch(input, init).then(handleErrors);
}

export default _fetch;
