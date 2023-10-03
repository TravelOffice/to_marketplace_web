import React, { useEffect, useMemo } from 'react';
import { DefaultPagination } from '@/components/base/Pagination';
import { useAvailableLeadsStore, useFirstLoadAvailableLeads } from '@/hooks/tourOrLead';
import LeadListItem from '@/pages/Dashboard/components/LeadListItem';

export default function LeadListCard() {
  const {
    pages,
    pageCount,
    currentPage,
    setCurrentPage,
    onFirstPageLoaded,
  } = useAvailableLeadsStore();

  const { data: firstPageData } = useFirstLoadAvailableLeads();
  useEffect(() => {
    if (firstPageData) {
      onFirstPageLoaded(firstPageData);
    }
  }, [firstPageData]);

  const leadsToShow = useMemo(() => {
    if (currentPage === 0) {
      return undefined;
    }
    return pages[currentPage - 1].data;
  }, [currentPage]);

  const hasMoreData = useMemo(() => {
    if (pageCount === 0) {
      return false;
    }
    const { paging } = pages[pages.length - 1];
    const nextToken = paging.cursors.before;
    return nextToken.length > 0;
  }, [pageCount]);

  return (
    <div className="w-full bg-white dark:bg-dark dark:text-white pb-2 shadow-lg rounded relative">
      <table className="w-full rounded-b pb-2">
        <caption
          className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Danh sách lead
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Dưới đây là danh sách lead hiện có. Hãy chọn lead
            phù hợp và tạo bài đăng theo nhu cầu.
          </p>
        </caption>
        <thead className="bg-gray-100 dark:bg-[#343d55] dark:text-white">
          <tr className="text-sm w-full">
            <th className="text-left w-24 font-medium py-3 rounded-t ps-5 uppercase">Mã</th>
            <th className="text-left w-1/5 font-medium uppercase">Tên KH</th>
            <th className="text-left w-1/5 font-medium uppercase">Loại tour</th>
            <th className="text-left font-medium uppercase">Tên tour</th>
            <th className="text-left font-medium uppercase">Nhu cầu</th>
            <th className="text-left w-1/6 font-medium uppercase pe-5">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {
          leadsToShow && leadsToShow.map((lead) => (
            <LeadListItem lead={lead} />
          ))
        }
        </tbody>
      </table>
      {
        pageCount !== 0 && (
          <DefaultPagination
            forView="leads"
            additionalClassNames="mx-4"
            showPageNumber
            hasMoreData={hasMoreData}
            pageCount={pageCount}
            onPageChange={(pageNumber: number) => {
              setCurrentPage(pageNumber);
            }}
            active={currentPage}
          />
        )
      }
    </div>
  );
}
