export type QueryParamsData = {
  endDate: Date;
  title: string;
  page: Page;
};

export type QueryParameter = keyof QueryParamsData;

export type Page = 'view' | 'edit';
