import React from 'react';
import classNames from 'classnames';
import { OfferStatus } from '@/models/TourPost/Offer';

interface FilterSentOfferButtonsProps {
  filteringOfferStatus: OfferStatus,
  setFilteringOfferStatus: React.Dispatch<React.SetStateAction<OfferStatus>>,
}

export default function FilterSentOfferButtons(props: FilterSentOfferButtonsProps) {
  const {
    filteringOfferStatus,
    setFilteringOfferStatus,
  } = props;

  return (
    <>
      <button
        type="button"
        className={classNames('px-2 py-2 rounded me-3 dark:text-gray-200 dark:border-gray-200', filteringOfferStatus === 'IN_PROCESS' ? ' border border-primary text-primary ' : 'border-gray-300 text-gray-300')}
        onClick={() => setFilteringOfferStatus(OfferStatus.IN_PROCESS)}
      >
        Đang xử lý
      </button>
      <button
        type="button"
        className={classNames('px-2 py-2 rounded me-3 dark:text-gray-200 dark:border-gray-200', filteringOfferStatus === 'ACCEPTED' ? ' border border-primary text-primary ' : 'border-gray-300 text-gray-300')}
        onClick={() => setFilteringOfferStatus(OfferStatus.ACCEPTED)}
      >
        Được chấp nhận
      </button>
      <button
        type="button"
        className={classNames('px-2 py-2 rounded me-3 dark:text-gray-200 dark:border-gray-200', filteringOfferStatus === 'REJECTED' ? ' border border-primary text-primary ' : 'border-gray-300 text-gray-300')}
        onClick={() => setFilteringOfferStatus(OfferStatus.REJECTED)}
      >
        Bị từ chối
      </button>
      <button
        type="button"
        className={classNames('px-2 py-2 rounded me-3 dark:text-gray-200 dark:border-gray-200', filteringOfferStatus === 'CANCELLED' ? ' border border-primary text-primary ' : 'border-gray-300 text-gray-300')}
        onClick={() => setFilteringOfferStatus(OfferStatus.CANCELLED)}
      >
        Đã hủy
      </button>
    </>
  );
}
