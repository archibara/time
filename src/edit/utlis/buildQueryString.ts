/*
 * build simple query string
 * this function does not support nested objects or arrays
 */
export const buildQueryString = (params: Record<string, string | number>) => Object.entries(params)
  .map(([
    key,
    value,
  ]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&');
