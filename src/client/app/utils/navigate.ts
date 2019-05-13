import { router } from '../core/router';

export const navigate = (path: string, query: { [key: string]: string } = {}) => (
  event?: Event
) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  router.push(path + getQuery(query));
};

export const getQuery = (query: { [key: string]: string } = {}) =>
  Object.entries(query).reduce((acc, [key, val], index) => {
    if (index === 0) {
      return `?${key}=${val}`;
    }

    return `${acc}&${key}=${val}`;
  }, '');
