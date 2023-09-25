import classNames from 'classnames';
import React, { useMemo } from 'react';
import { numberArrayOf } from '@/utils/arrays';

export interface PaginationProps {
  additionalClassNames?: string,
  showPageNumber?: boolean,
  pageCount: number,
  active: number,
  forView: string,
  hasMoreData?: boolean,
  onPageChange: (pageNumber: number) => void,
}

export function DefaultPagination(props: PaginationProps) {
  // Props
  const {
    showPageNumber,
    additionalClassNames,
    pageCount,
    active,
    onPageChange,
    forView,
    hasMoreData,
  } = props;

  const nextButtonDisabled = useMemo(
    () => active === pageCount && !hasMoreData,
    [active, pageCount, hasMoreData],
  );

  const getItemProps = (pageNumber: number) => ({
    onClick: () => onPageChange(pageNumber),
    className: classNames(
      pageNumber === active ? 'text-primary' : 'text-gray-900',
      'bg-white focus:outline-none hover:text-primary focus:ring-4 focus:ring-gray-200 font-medium text-sm',
    ),
  } as React.ComponentPropsWithoutRef<'button'>);

  const next = () => {
    if (active === pageCount && !hasMoreData) return;

    // Move to the next page
    // If next page is not loaded, then load it from server
    onPageChange(active + 1);
  };

  const prev = () => {
    // Can not get previous page if current page is first page
    if (active === 0) return;

    // Move to the previous page
    onPageChange(active - 1);
  };

  return (
    <div className={classNames('flex items-center gap-4 my-2', additionalClassNames)}>
      <button
        type="button"
        className={
          classNames(
            active === 1 ? 'bg-gray-100' : 'bg-white hover:bg-gray-100 hover:text-primary',
            'py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200',
          )
        }
        onClick={prev}
        disabled={active === 1}
      >
        <span className="sr-only">Trước</span>
        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
        </svg>
      </button>
      {
        showPageNumber && (
          <div className="flex items-center gap-2">
            {
              numberArrayOf(pageCount)
                .map((index) => {
                  const buttonProps = getItemProps(index + 1);
                  return (
                    <button
                      key={`pagination-${forView}-${index}`}
                      type="button"
                      className="text-gray-900 bg-white focus:outline-none hover:text-primary focus:ring-4 focus:ring-gray-200 font-medium text-sm"
                      {...buttonProps}
                    >
                      {index + 1}
                    </button>
                  );
                })
            }
          </div>
        )
      }
      {
        hasMoreData && (<span className="text-gray-900 dark:text-white">...</span>)
      }
      <button
        type="button"
        className={
          classNames(
            nextButtonDisabled ? 'bg-gray-100' : 'bg-white hover:bg-gray-100 hover:text-primary',
            'py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200',
          )
        }
        onClick={next}
        disabled={nextButtonDisabled}
      >
        <span className="sr-only">Sau</span>
        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
        </svg>
      </button>
    </div>
  );
}
