import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {getQueryParamsData} from '../shared/queryParams';
import {baseUrl} from '../shared/constants.ts';
import {useDebouncedValue} from './useDebouncedValue.ts';
import {dateToDatetimeLocalString} from './utlis/dateToDatetimeLocalString.ts';
import {queryParamsDataToSearchParams} from './utlis/queryParamsDataToSearchParams.ts';
import {setSearchParams} from './utlis/setSearchParams.ts';
import {sandbox} from './constants.ts';

const App = () => {
  const [
    queryParamsData,
    setQueryParamsData,
  ] = useState(() => getQueryParamsData());

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const endDateString = dateToDatetimeLocalString(queryParamsData.endDate);
  const iframeSearchParams = useDebouncedValue(
    queryParamsDataToSearchParams(queryParamsData),
    200
  );
  const iframeSrc = `${baseUrl}?${iframeSearchParams}`;

  useEffect(
    () => {
      // set same query string to this window to persist the state
      setSearchParams(iframeSearchParams);
    },
    [iframeSearchParams]
  );

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      setQueryParamsData(
        (state) => ({
          ...state,
          title,
        })
      );
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
      setQueryParamsData(
        (state) => ({
          ...state,
          endDate: date,
        })
      );
    },
    []
  );

  const handleView = useCallback(
    () => {
      window.location.href = iframeSrc;
    },
    [iframeSrc]
  );

  const handleCopyLink = useCallback(
    () => {
      navigator.clipboard.writeText(iframeSrc).catch(alert);
    },
    [iframeSrc]
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
          defaultValue={queryParamsData.title}
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
        // eslint-disable-next-line react-dom/no-missing-iframe-sandbox
        sandbox={sandbox}
        src={iframeSrc}
      />
    </>
  );
};

export default App;
