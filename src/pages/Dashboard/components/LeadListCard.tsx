import React from 'react';
import classNames from 'classnames';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const leads = Array.from({ length: 3 }, (_, i) => i);

export default function LeadListCard() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div className="col-span-1 card shadow-lg rounded relative flex flex-col">
      <h3 className="font-bold text-xl">Lead đang chờ</h3>
      <div className="w-full flex-1 relative overflow-hidden">
        {
          leads.map((item, i) => (
            <div key={item} className="absolute top-0 left-0 w-full h-full pb-3 pt-4 transition-transform duration-500" style={{ transform: `translateX(${(i - activeIndex) * 100}%)` }}>
              <div className="flex flex-col gap-2 h-full">
                <div className="flex justify-between">
                  <span>Tên khách hàng</span>
                  <span className="font-semibold">
                    Nguyễn Văn A
                    {item}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Số điện thoại</span>
                  <span className="font-semibold">0312456789</span>
                </div>
                <div className="flex justify-between">
                  <span>Tour yêu cầu</span>
                  <span className="font-semibold">Tour Hà Nội - Hà Giang 5N4Đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Ngày khởi hành</span>
                  <span className="font-semibold">20/10/2023</span>
                </div>
                <div className="flex justify-between">
                  <span>Số hành khách</span>
                  <span className="font-semibold">4 người</span>
                </div>
                <div className="flex justify-between">
                  <span>Yêu cầu thêm</span>
                  <span className="font-semibold">Lorem ipsum</span>
                </div>
                <div className="flex flex-1 items-end">
                  <button type="button" className="w-full bg-primary py-2.5 text-white rounded">Tạo bài viết</button>
                </div>
              </div>
            </div>
          ))
        }
        <div className="absolute top-0 left-0 translate-x-full w-full h-full bg-blue-400">
          <div>
            <div className="flex justify-between">
              <span>Tên khách hàng</span>
              <span>Nguyễn Văn B</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 translate-x-[200%] w-full h-full bg-red-500">
          <div>
            <div className="flex justify-between">
              <span>Tên khách hàng</span>
              <span>Nguyễn Văn C</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white rounded-full shadow-lg flex justify-center items-center dark:bg-dark"
          onClick={() => setActiveIndex((activeIndex + leads.length - 1) % leads.length)}
        >
          <FiArrowLeft />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-5 w-10 h-10 bg-white rounded-full shadow-lg flex justify-center items-center dark:bg-dark"
          onClick={() => setActiveIndex((activeIndex + 1) % leads.length)}
        >
          <FiArrowRight />
        </button>
      </div>
      <div className="flex justify-center mt-2 gap-3">
        {
          leads.map((item, i) => (
            <button
              key={item}
              type="button"
              className={classNames(
                'w-3 h-3 rounded-full',
                'bg-primary',
                { 'opacity-50': i !== activeIndex },
              )}
              aria-label="Slide 1"
              onClick={() => setActiveIndex(i)}
            />
          ))
        }
      </div>
    </div>
  );
}
