import React from 'react';
import goldBadge from '@/assets/images/illustrator/badge.svg';
import silverBadge from '@/assets/images/illustrator/badge-silver.svg';
import bronzeBadge from '@/assets/images/illustrator/badge-bronze.svg';

export default function TopCommission() {
  return (
    <div className="col-span-2 bg-white pb-2 shadow-lg rounded relative">
      <table className="w-full rounded-b pb-2">
        <thead className="bg-gray-100">
          <tr className="text-sm w-full">
            <th className="text-left font-medium py-3 rounded-t ps-5 uppercase">Tour</th>
            <th className="text-left font-medium py-3 rounded-t ps-5 uppercase">Commission</th>
            <th className="text-left w-1/6 font-medium uppercase">Loại tour</th>
            <th className="text-left w-1/6 font-medium uppercase">Khởi hành</th>
            <th className="text-left w-1/6 font-medium uppercase pe-5">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr className="py-3 border-b">
            <td className="text-left text-sm py-3 ps-5 relative">
              Tour Hà Nội - TP HCM 5N4Đ
              <img src={goldBadge} alt="" className="absolute top-0 right-5 h-12" />
            </td>
            <td className="text-left text-sm py-3 ps-5">30%</td>
            <td className="text-left text-sm">Nội địa</td>
            <td className="text-left text-sm">02/09/2023</td>
            <td className="pe-5">
              <button type="button" className="w-full px-5 py-2 bg-primary my-2 rounded text-white">Xem chi tiết</button>
            </td>
          </tr>
          <tr className="py-3 border-b">
            <td className="text-left text-sm py-3 ps-5 relative">
              Tour Hà Nội - Bắc Kinh 6N5Đ
              <img src={silverBadge} alt="" className="absolute top-0 right-5 h-12" />
            </td>
            <td className="text-left text-sm py-3 ps-5">30%</td>
            <td className="text-left text-sm">Quốc tế</td>
            <td className="text-left text-sm">02/09/2023</td>
            <td className="pe-5">
              <button type="button" className="w-full px-5 py-2 bg-primary my-2 rounded text-white">Xem chi tiết</button>
            </td>
          </tr>
          <tr className="py-3 border-b">
            <td className="text-left text-sm py-3 ps-5 relative">
              Tour TP. HCM - Bắc Kinh 6N5Đ
              <img src={bronzeBadge} alt="" className="absolute top-0 right-5 h-12" />
            </td>
            <td className="text-left text-sm py-3 ps-5">30%</td>
            <td className="text-left text-sm">Quốc tế</td>
            <td className="text-left text-sm">02/09/2023</td>
            <td className="pe-5">
              <button type="button" className="w-full px-5 py-2 bg-primary my-2 rounded text-white">Xem chi tiết</button>
            </td>
          </tr>
          <tr className="py-3 border-b">
            <td className="text-left text-sm py-3 ps-5">Tour Hà Nội - Hà Giang</td>
            <td className="text-left text-sm py-3 ps-5">30%</td>
            <td className="text-left text-sm">Nội địa</td>
            <td className="text-left text-sm">02/09/2023</td>
            <td className="pe-5">
              <button type="button" className="w-full px-5 py-2 bg-primary my-2 rounded text-white">Xem chi tiết</button>
            </td>
          </tr>
          <tr className="py-3 border-b">
            <td className="text-left text-sm py-3 ps-5">Tour Hà Nội - Hà Giang</td>
            <td className="text-left text-sm py-3 ps-5">30%</td>
            <td className="text-left text-sm">Nội địa</td>
            <td className="text-left text-sm">02/09/2023</td>
            <td className="pe-5">
              <button type="button" className="w-full px-5 py-2 bg-primary my-2 rounded text-white">Xem chi tiết</button>
            </td>
          </tr>
          <tr className="py-3">
            <td className="text-left text-sm py-3 ps-5">Tour Hà Nội - Hà Giang</td>
            <td className="text-left text-sm py-3 ps-5">30%</td>
            <td className="text-left text-sm">Nội địa</td>
            <td className="text-left text-sm">02/09/2023</td>
            <td className="pe-5">
              <button type="button" className="w-full px-5 py-2 bg-primary my-2 rounded text-white">Xem chi tiết</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
