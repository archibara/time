import { pageAlias, queryParameterAlias } from './constants.ts';
import { QueryParamsData } from './types.ts';

const parseDate = (date: string): Date | null => {
  const maybeDate = new Date(date);
  if (!isNaN(maybeDate.getTime())) {
    return maybeDate;
  }

  const maybeSeconds = parseFloat(date);
  if (!isNaN(maybeSeconds)) {
    return new Date(maybeSeconds * 1000);
  }


  return null;
};

const parseAlias = <K extends string>(value: string, keyAliases: Record<K, string[]>): K | null => {
  const entries = Object.entries(keyAliases) as [K, string[]][];
  for (const [key, aliases] of entries) {
    if (aliases.includes(value)) {
      return key as K;
    }
  }
  return null;
};


export const getQueryParamsData = (search = window.location.search): QueryParamsData => {
  const params = new URLSearchParams(search);
  const data: QueryParamsData = {
    endDate: new Date(Date.now() + 30 * 60 * 1000),
    title: 'Time',
    page: 'edit',
  };

  for (const qKey of params.keys()) {
    const p = parseAlias(qKey, queryParameterAlias);
    if (p === null) continue;
    const stringValue = params.get(qKey)!;
    switch (p) {
      case 'endDate': {
        data.endDate = parseDate(stringValue) || data.endDate;
        break;
      }
      case 'title': {
        data.title = stringValue;
        break;
      }
      case 'page': {
        data.page = parseAlias(stringValue, pageAlias) || data.page;
        break;
      }
    }
  }

  return data;
};