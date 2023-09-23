import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import Layout from '@/components/base/Layout';
import Tabs from '@/components/base/Tabs';
import { TourPostType } from '@/models/TourPost/TourPostType';
import { useFilteringPostStore } from '@/hooks/post';
import TourList from './components/TourList';

const tabs = [
  {
    title: 'Tìm tour',
    content: <TourList postType={TourPostType.SELL_PASSENGER} />,
  },
  {
    title: 'Tìm khách',
    content: <TourList postType={TourPostType.BUY_PASSENGER} />,
  },
];

export interface FilterPostFormData {
  endingLocation?: string,
  departureDate?: string,
}

export default function PostList() {
  const {
    handleSubmit,
    register,
    reset,
  } = useForm<FilterPostFormData>();

  const {
    filteringEndingLocation,
    filteringDepartureDate,
    setFilteringDepartureDate,
    setFilteringEndingLocation,
  } = useFilteringPostStore();

  const filterPosts = (data: FilterPostFormData) => {
    setFilteringEndingLocation(data.endingLocation);
    setFilteringDepartureDate(data.departureDate);
  };

  const resetFiltering = () => {
    setFilteringDepartureDate(undefined);
    setFilteringEndingLocation(undefined);
    reset({
      endingLocation: '',
      departureDate: '',
    });
  };

  useEffect(() => {
    reset({
      endingLocation: filteringEndingLocation,
      departureDate: filteringDepartureDate,
    });
  }, [filteringDepartureDate, filteringDepartureDate]);

  return (
    <Layout>
      <div className="mx-8 pt-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="card sticky top-32 col-span-3 h-fit">
            <h6 className="font-bold mb-6">Lọc bài đăng</h6>
            <form onSubmit={handleSubmit(filterPosts)}>
              <label
                className="block mb-2 text-sm text-secondary dark:text-white"
                htmlFor="endingLocation"
              >
                Điểm
                đến
              </label>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                )}
                {...register('endingLocation')}
              />

              <label
                className="block mb-2 text-sm text-secondary dark:text-white"
                htmlFor="departureDate"
              >
                Ngày khởi
                hành
              </label>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                )}
                type="date"
                {...register('departureDate')}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white mt-4 font-medium text-sm px-5 py-2.5"
              >
                Tìm kiếm
              </button>
              <button
                type="button"
                className="border-[2px] w-full text-primary mt-2 font-medium text-sm px-5 py-2.5"
                onClick={resetFiltering}
              >
                Xóa lọc
              </button>
            </form>
          </div>
          <div className="col-span-9 h-fit bg-white dark:bg-[#283046] dark:text-white">
            <Tabs
              tabs={tabs}
              divider={false}
              sticky
              stickyClassName="pt-6 top-32 bg-white dark:bg-[#283046]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
