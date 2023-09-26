import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultPagination } from '@/components/base/Pagination';
import { TourTemplate } from '@/models/Tour/TourTemplate';
import { CreatePostProps } from '@/pages/Posts/Create';
import { useAvailableToursStore, useFirstLoadAvailableTours } from '@/hooks/tourOrLead';

export default function TourListCard() {
  const {
    pages,
    pageCount,
    currentPage,
    setCurrentPage,
    onFirstPageLoaded,
  } = useAvailableToursStore();

  const navigate = useNavigate();

  const { data: firstPageData } = useFirstLoadAvailableTours();
  useEffect(() => {
    if (firstPageData) {
      onFirstPageLoaded(firstPageData);
    }
  }, [firstPageData]);

  const toursToShow = useMemo(() => {
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

  const onCreatePost = (tourTemplate: TourTemplate) => navigate('/posts/create', {
    state: {
      name: tourTemplate.name,
      linkedToTargetCode: tourTemplate.code,
      linkedToTargetType: 'TOUR_TEMPLATE',
      type: 'BUY_PASSENGER',
      maximumPaxToTrade: tourTemplate.visitorCount,
    } as CreatePostProps,
  });

  return (
    <div className="w-full bg-white dark:bg-dark dark:text-white pb-2 shadow-lg rounded relative">
      <table className="w-full rounded-b pb-2">
        <caption
          className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Danh sách tour
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Dưới đây là danh sách tour hiện có. Hãy chọn tour
            phù hợp và tạo bài đăng theo nhu cầu.
          </p>
        </caption>
        <thead className="bg-gray-100 dark:bg-[#343d55] dark:text-white">
          <tr className="text-sm w-full">
            <th className="text-left w-24 font-medium py-3 rounded-t ps-5 uppercase">Mã</th>
            <th className="text-left font-medium uppercase">Tour</th>
            <th className="text-left w-1/5 font-medium uppercase">Loại tour</th>
            <th className="text-left w-1/5 font-medium uppercase">SL Hành khách</th>
            <th className="text-left w-1/6 font-medium uppercase pe-5">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {
          toursToShow && toursToShow.map((tourTemplate) => {
            const {
              code,
              type,
              name,
              visitorCount,
            } = tourTemplate;
            return (
              <tr key={`tourTemplate-${code}`} className="py-3 border-b dark:border-b-gray-700">
                <td className="text-left text-sm py-3 ps-5">{code}</td>
                <td className="text-left text-sm">{name}</td>
                <td className="text-left text-sm">{type}</td>
                <td className="text-left text-sm">{visitorCount}</td>
                <td className="pe-5">
                  <button
                    type="button"
                    className="w-full px-5 py-2 bg-primary my-2 rounded text-white"
                    onClick={() => onCreatePost(tourTemplate)}
                  >
                    Tạo bài viết
                  </button>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
      {
        pageCount !== 0 && (
          <DefaultPagination
            forView="tours"
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
