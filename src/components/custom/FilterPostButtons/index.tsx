import React from 'react';
import classNames from 'classnames';
import { TourPostStatus } from '@/models/TourPost/TourPostStatus';

interface FilterPostButtonsProps {
  filteringStatus: TourPostStatus,
  setFilteringStatus: React.Dispatch<React.SetStateAction<TourPostStatus>>,
}

export default function FilterPostButtons(props: FilterPostButtonsProps) {
  const {
    filteringStatus,
    setFilteringStatus,
  } = props;

  return (
    <>
      <button
        type="button"
        className={classNames('px-2 py-2 rounded me-3 dark:text-gray-200 dark:border-gray-200', filteringStatus === 'IN_PROCESS' ? ' border border-primary text-primary ' : 'border-gray-300 text-gray-300')}
        onClick={() => setFilteringStatus(TourPostStatus.IN_PROCESS)}
      >
        Đang ghép
      </button>
      <button
        type="button"
        className={classNames('px-2 py-2 rounded me-3 dark:text-gray-200 dark:border-gray-200', filteringStatus === 'CLOSED' ? ' border border-primary text-primary ' : 'border-gray-300 text-gray-300')}
        onClick={() => setFilteringStatus(TourPostStatus.CLOSED)}
      >
        Đã đóng
      </button>
      <button
        type="button"
        className={classNames('px-2 py-2 rounded me-3 dark:text-gray-200 dark:border-gray-200', filteringStatus === 'EXPIRED' ? ' border border-primary text-primary ' : 'border-gray-300 text-gray-300')}
        onClick={() => setFilteringStatus(TourPostStatus.EXPIRED)}
      >
        Đã hết hạn
      </button>
    </>
  );
}
