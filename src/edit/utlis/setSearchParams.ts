/*
 * set search params to window without reloading the page
 * set same query string to this window to persist the state
 */
export const setSearchParams = (search: string, win = window) => {
  const url = new URL(win.location.href);
  url.search = search;
  win.history.replaceState(
    {},
    '',
    url.toString()
  );
};
