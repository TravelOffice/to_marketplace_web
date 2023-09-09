import React from 'react';
import moment from 'moment';
import { PiAirplaneLanding, PiCalendar } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import goldBadge from '@/assets/images/illustrator/badge.svg';
import silverBadge from '@/assets/images/illustrator/badge-silver.svg';
import bronzeBadge from '@/assets/images/illustrator/badge-bronze.svg';
import { useTopCommissionPosts } from '@/hooks/post';
import { useDateDuration } from '@/utils/common';

function getTop123Badge(topIndex: number) {
  switch (topIndex) {
    case 1: return goldBadge;
    case 2: return silverBadge;
    case 3: return bronzeBadge;

    default: return undefined;
  }
}

export default function TopCommission() {
  const { data: topPosts = [] } = useTopCommissionPosts();
  return (
    <div className="col-span-2 bg-white dark:bg-dark dark:text-white pb-2 shadow-lg rounded relative">
      <table className="w-full rounded-b pb-2">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Bài viết nổi bật
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Các bài đăng đang có tỉ lệ hoa hồng khi ghép cao nhất. Hãy chọn bài
            đăng phù hợp và tạo yêu cầu ghép tour.
          </p>
        </caption>
        <thead className="bg-gray-100 dark:bg-[#343d55]">
          <tr className="text-sm w-full">
            <th className="text-left font-medium py-3 rounded-t ps-5 uppercase">Tour</th>
            <th className="text-left font-medium py-3 rounded-t ps-5 uppercase">Hoa hồng</th>
            <th className="text-left w-1/6 font-medium uppercase">Đến</th>
            <th className="text-left w-1/6 font-medium uppercase">Khởi hành</th>
            <th className="text-center w-1/6 font-medium uppercase pe-5">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {
            topPosts
              .sort((previous, next) => next.commission - previous.commission)
              .map((post, index) => {
                const {
                  name,
                  commission,
                  departureDate,
                  endingLocation,
                } = post;
                return (
                  <tr
                    key={`top-commissions-post-${post.code}`}
                    className="py-3 border-b dark:border-b-gray-700"
                  >
                    <td className="text-left text-sm py-3 ps-5 relative">
                      <div className="flex flex-col">
                        <div>{name}</div>
                        <span className="text-blue-800 text-xs font-medium inline-flex items-center py-0.5">
                          <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                          </svg>
                          {useDateDuration(post.createdAt)}
                        </span>
                      </div>
                      <img src={getTop123Badge(index + 1)} alt="" className="absolute top-0 right-5 h-12" />
                    </td>
                    <td className="text-left text-sm py-3 ps-5">
                      {new Intl.NumberFormat('vi-VN').format(commission)}
                      {' '}
                      đ
                    </td>
                    <td className="text-left text-sm">
                      <div className="flex gap-1">
                        <PiAirplaneLanding className="h-6 w-6 text-gray-400 dark:text-white" />
                        {endingLocation}
                      </div>
                    </td>
                    <td className="text-left text-sm">
                      <div className="flex gap-1">
                        <PiCalendar className="h-6 w-6 text-gray-400 dark:text-white" />
                        {moment(departureDate).format('DD/MM/YYYY')}
                      </div>
                    </td>
                    <td className="pe-5">
                      <Link to={`/posts/${post.code}`}>
                        <button
                          type="button"
                          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 w-full px-5 py-2 bg-primary my-2 rounded text-white"
                        >
                          Xem chi tiết
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    </div>
  );
}
