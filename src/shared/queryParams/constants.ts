import {Page, QueryParameter} from './types.ts';

export const queryParameterAlias: Record<QueryParameter, string[]> = {
  endDate: [
    't',
    'endDate',
  ],
  title: [
    'l',
    'title',
  ],
  page: [
    'p',
    'page',
  ],
};

export const queryParameterKeys = Object.keys(queryParameterAlias) as QueryParameter[];

export const pageAlias: Record<Page, string[]> = {
  view: [
    'v',
    'view',
  ],
  edit: [
    'e',
    'edit',
  ],
};
