import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {getQueryParamsData} from '../shared/queryParams';
import {queryParameterAlias} from '../shared/queryParams/constants.ts';
import {useDebouncedValue} from './useDebouncedValue.ts';

const sandbox = import.meta.env.DEV
  ? undefined
  // use all restrictions in production
  : '';

const getViewBaseUrl = (): string => {
  const url = new URL(window.location.href);
  let path = url.pathname;
  // add ending slash if it doesn't exist
  if (!path.endsWith('/')) {
    path += '/';
  }
  path = path.split('/')
    // hide empty parts
    .filter(Boolean)
    // remove last part (/edit)
    .slice(
      0,
      -1
    )
    // convert to string
    .join('/');
  return `${url.origin}/${path}`;
};

const dateToDatetimeLocalString = (date: Date): string => {
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffsetInMs).toISOString()
    .slice(
      0,
      16
    );
};

const getViewSearch = (title: string, endDate: Date): string => [
  [
    queryParameterAlias.title[0],
    title,
  ],
  [
    queryParameterAlias.endDate[0],
    dateToDatetimeLocalString(endDate),
  ],
]
  .map((e) => e.join('='))
  .join('&');

// set same query string to this window to persist the state
const setSearchParams = (search: string) => {
  const url = new URL(window.location.href);
  url.search = search;
  window.history.replaceState(
    {},
    '',
    url.toString()
  );
};

const App = () => {
  const [
    {title, endDate},
    setState,
  ] = useState(() => getQueryParamsData());
  const [viewBaseUrl] = useState(() => getViewBaseUrl());
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const endDateString = dateToDatetimeLocalString(endDate);
  const viewSearch = useDebouncedValue(
    getViewSearch(
      title,
      endDate
    ),
    200
  );
  const viewSrc = `${viewBaseUrl}?${viewSearch}`;

  useEffect(
    () => {
      setSearchParams(viewSearch);
    },
    [viewSearch]
  );

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      setState((state) => ({...state,
        title}));
    },
    []
  );

  const handleEndDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value);
      // if date is invalid - do nothing
      if (isNaN(date.getTime())) {
        return;
      }
      setState((state) => ({...state,
        endDate: date}));
    },
    []
  );

  const handleView = useCallback(
    () => {
      window.location.href = viewSrc;
    },
    [viewSrc]
  );

  const handleCopyLink = useCallback(
    () => {
      navigator.clipboard.writeText(viewSrc).catch(alert);
    },
    [viewSrc]
  );


  return (
    <>
      <div className='form'>
        <label
          className='label'
          htmlFor='title'
        >
          Title:
        </label>

        <input
          className='input'
          defaultValue={title}
          type='text'
          onChange={handleTitleChange}
        />

        <label
          className='label'
          htmlFor='date'
        >
          End date:
        </label>

        <input
          className='input'
          defaultValue={endDateString}
          type='datetime-local'
          onChange={handleEndDateChange}
        />

        <div className='btn-container'>
          <input
            className='btn-view'
            type='button'
            value='View'
            onClick={handleView}
          />

          <span
            className='btn-copy-link'
            onClick={handleCopyLink}
          >
            Copy link
          </span>
        </div>
      </div>

      <iframe
        className='iframe'
        ref={iframeRef}
        rel='noopener noreferrer'
        sandbox={sandbox}
        src={viewSrc}
      />
    </>
  );
};

export default App;
