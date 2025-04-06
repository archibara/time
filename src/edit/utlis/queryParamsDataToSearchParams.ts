import {queryParameterAlias} from '../../shared/queryParams/constants.ts';
import {QueryParamsData} from '../../shared/queryParams/types.ts';
import {dateToDatetimeLocalString} from './dateToDatetimeLocalString.ts';
import {buildQueryString} from './buildQueryString.ts';

// returns the search string for the view page including QueryParamsData
export const queryParamsDataToSearchParams = ({title, endDate}: QueryParamsData): string => buildQueryString({
  [queryParameterAlias.title[0]]: title,
  [queryParameterAlias.endDate[0]]: dateToDatetimeLocalString(endDate),
});
