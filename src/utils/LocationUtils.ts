import * as H from 'history';

/**
 * Parse a param from location
 * @param location
 * @param paramName
 */
export const parseParam = (location: H.Location, paramName: string): string => {
  if (!location || !location.search) {
    return '';
  }
  const params = new URLSearchParams(location.search);
  return params.get(paramName) || '';
};

/**
 * Get Header If from response
 * @param response
 */
export const getHeaderId = (response: any) => {
  if (!response || !response.headers || !response.headers.location) {
    return null;
  }
  const split = response.headers.location.split('/');
  return split[split.length - 1];
};
