export const queryString = (query: { [key: string]: string }): string =>
  `?${new URLSearchParams(Object.entries(query)).toString()}`;
