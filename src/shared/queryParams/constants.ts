import {QueryParameter} from './types.ts';

export const queryParameterAlias: Record<QueryParameter, string[]> = {
  endDate: [
    't',
    'endDate',
  ],
  title: [
    'l',
    'title',
  ],
};

export const queryParameterKeys = Object.keys(queryParameterAlias) as QueryParameter[];
