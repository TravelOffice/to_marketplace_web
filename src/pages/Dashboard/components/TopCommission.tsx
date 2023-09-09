import React from 'react';
import goldBadge from '@/assets/images/illustrator/badge.svg';
import silverBadge from '@/assets/images/illustrator/badge-silver.svg';
import bronzeBadge from '@/assets/images/illustrator/badge-bronze.svg';
import { useTopCommissionPosts } from '@/hooks/post';
import moment from 'moment';
import { PiAirplaneLanding, PiCalendar } from 'react-icons/pi';
import { Link } from 'react-router-dom';


function getTop123Badge(topIndex: number) {
  switch (topIndex) {
    case 1: return goldBadge;
    case 2: return silverBadge;
    case 3: return bronzeBadge;

    default: return;
  }
}

export default function TopCommission() {
  const { data: topPosts = [] } = useTopCommissionPosts();
  return (
    <div className="col-span-2 bg-white dark:bg-dark dark:text-white pb-2 shadow-lg rounded relative">
      <table className="w-full rounded-b pb-2">
        <thead className="bg-gray-100 dark:bg-[#343d55]">
          <tr className="text-sm w-full">
            <th className="text-left font-medium py-3 rounded-t ps-5 uppercase">Bài viết nổi bật</th>
            <th className="text-left font-medium py-3 rounded-t ps-5 uppercase">Hoa hồng</th>
            <th className="text-left w-1/6 font-medium uppercase">Đến</th>
            <th className="text-left w-1/6 font-medium uppercase">Khởi hành</th>
            <th className="text-left w-1/6 font-medium uppercase pe-5">Hành động</th>
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
                  <tr className="py-3 border-b dark:border-b-gray-700">
                    <td className="text-left text-sm py-3 ps-5 relative">
                      {name}
                      <img src={getTop123Badge(index + 1)} alt="" className="absolute top-0 right-5 h-12" />
                    </td>
                    <td className="text-left text-sm py-3 ps-5">{new Intl.NumberFormat('vi-VN').format(commission)} đ</td>
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
                      <button
                        type="button"
                        className="w-full px-5 py-2 bg-primary my-2 rounded text-white"
                      >
                        <Link to={`/posts/${post.code}`}>Xem chi tiết</Link>
                      </button>
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
