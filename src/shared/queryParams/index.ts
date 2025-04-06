import {queryParameterAlias} from './constants.ts';
import {QueryParamsData} from './types.ts';

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
  for (const [
    key,
    aliases,
  ] of entries) {
    if (aliases.includes(value)) {
      return key;
    }
  }
  return null;
};


export const getQueryParamsData = (search = window.location.search): QueryParamsData => {
  const params = new URLSearchParams(search);
  // 30 minutes
  const addMs = 30 * 60 * 1000;
  const data: QueryParamsData = {
    endDate: new Date(Date.now() + addMs),
    title: 'Time',
  };

  for (const qKey of params.keys()) {
    const p = parseAlias(
      qKey,
      queryParameterAlias
    );
    if (p === null) continue;
    const stringValue = params.get(qKey) ?? '';
    switch (p) {
      case 'endDate': {
        data.endDate = parseDate(stringValue) ?? data.endDate;
        break;
      }
      case 'title': {
        data.title = stringValue;
        break;
      }
    }
  }

  return data;
};
