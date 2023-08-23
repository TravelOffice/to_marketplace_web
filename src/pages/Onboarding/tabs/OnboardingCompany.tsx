import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateOrganizationFormData } from '@/models/Organization/Organization';

export interface OnboardingCompanyProps {
  form: UseFormReturn<CreateOrganizationFormData>
  onNext: () => void,
}

export default function OnboardingCompany(props: OnboardingCompanyProps) {
  const {
    onNext,
    form,
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit = (data: CreateOrganizationFormData) => {
    console.log(data);
    onNext();
  };

  return (
    <div
      className="bg-white max-w-3xl mx-auto max-h-3/4 mt-10 p-6 rounded-lg shadow-lg dark:bg-[#283046] dark:text-white"
    >
      <h5 className="font-bold text-lg mb-6">Thông tin công ty</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 max-h-[50vh] overflow-y-auto pb-4">
          <div>
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Tên công ty
              <span className="text-red-700">*</span>
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-[#283046] dark:text-white dark:border-[#404656]"
            />
            {errors.name
              && <p className="text-red-700 text-xs italic mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Logo
            </label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border-[1px] border-gray-200 border-solid bg-clip-padding px-4 py-2 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-4 file:-my-4 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-4 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:text-gray-500 dark:file:bg-gray-100 dark:focus:border-primary"
              type="file"
              accept="image/*"
              placeholder="Chọn hình ảnh"
              {...register('profilePictureFile')}
            />
            {errors.profilePictureFile
              && <p className="text-red-700 text-xs italic mt-1">{errors.profilePictureFile.message}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Email công ty
              <span className="text-red-700">*</span>
            </label>
            <input
              {...register('email')}
              type="text"
              className="w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-[#283046] dark:text-white dark:border-[#404656]"
            />
            {errors.email
              && <p className="text-red-700 text-xs italic mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Số điện thoại công ty
              <span className="text-red-700">*</span>
            </label>
            <input
              {...register('phoneNumber')}
              type="text"
              className="w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-[#283046] dark:text-white dark:border-[#404656]"
            />
            {errors.phoneNumber
              && <p className="text-red-700 text-xs italic mt-1">{errors.phoneNumber.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Địa chỉ công ty
            </label>
            <input
              {...register('address')}
              type="text"
              className="w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-[#283046] dark:text-white dark:border-[#404656]"
            />
            {errors.address
              && <p className="text-red-700 text-xs italic mt-1">{errors.address.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Website
            </label>
            <input
              {...register('website')}
              type="text"
              className="w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-[#283046] dark:text-white dark:border-[#404656]"
            />
            {errors.website
              && <p className="text-red-700 text-xs italic mt-1">{errors.website.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Số lượng nhân viên
            </label>
            <input
              {...register('employeesCount')}
              type="number"
              className="w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-[#283046] dark:text-white dark:border-[#404656]"
            />
            {errors.employeesCount
              && <p className="text-red-700 text-xs italic mt-1">{errors.employeesCount.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Năm thành lập
            </label>
            <input
              {...register('foundedYear')}
              type="number"
              className="w-full border-[1px] border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-[#283046] dark:text-white dark:border-[#404656]"
            />
            {errors.foundedYear
              && <p className="text-red-700 text-xs italic mt-1">{errors.foundedYear.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Facebook
            </label>
            <div
              className="flex items-center border-[1px] border-gray-200 rounded-lg dark:border-[#404656]"
            >
              <span
                className="text-gray-500 bg-gray-100 py-2 px-4 h-full rounded-l-lg"
              >
                https://facebook.com/
              </span>
              <Controller
                control={control}
                name="socialMedia.facebook"
                render={({
                  field: {
                    onChange,
                    value,
                    ...rest
                  },
                }) => (
                  <input
                    className="w-full ps-2 py-2 pe-4 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-primary dark:bg-[#283046] dark:text-white"
                    value={value?.replace('https://facebook.com/', '')}
                    onChange={(e) => onChange(`https://facebook.com/${e.target.value}`)}
                    {...rest}
                  />
                )}
              />
            </div>
            {errors.socialMedia?.facebook
              && <p className="text-red-700 text-xs italic mt-1">{errors.socialMedia.facebook.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Zalo
            </label>
            <div
              className="flex items-center border-[1px] border-gray-200 rounded-lg dark:border-[#404656]"
            >
              <span
                className="text-gray-500 bg-gray-100 py-2 px-4 h-full rounded-l-lg"
              >
                https://zalo.me/
              </span>
              <Controller
                control={control}
                name="socialMedia.zalo"
                render={({
                  field: {
                    onChange,
                    value,
                    ...rest
                  },
                }) => (
                  <input
                    className="w-full ps-2 py-2 pe-4 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-primary dark:bg-[#283046] dark:text-white"
                    value={value?.replace('https://zalo.me/', '')}
                    onChange={(e) => onChange(`https://zalo.me/${e.target.value}`)}
                    {...rest}
                  />
                )}
              />
            </div>
            {errors.socialMedia?.zalo
              && <p className="text-red-700 text-xs italic mt-1">{errors.socialMedia.zalo.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Twitter
            </label>
            <div
              className="flex items-center border-[1px] border-gray-200 rounded-lg dark:border-[#404656]"
            >
              <span
                className="text-gray-500 bg-gray-100 py-2 px-4 h-full rounded-l-lg"
              >
                https://twitter.com/
              </span>
              <Controller
                control={control}
                name="socialMedia.twitter"
                render={({
                  field: {
                    onChange,
                    value,
                    ...rest
                  },
                }) => (
                  <input
                    className="w-full ps-2 py-2 pe-4 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-primary dark:bg-[#283046] dark:text-white"
                    value={value?.replace('https://twitter.com/', '')}
                    onChange={(e) => onChange(`https://twitter.com/${e.target.value}`)}
                    {...rest}
                  />
                )}
              />
            </div>
            {errors.socialMedia?.twitter
              && <p className="text-red-700 text-xs italic mt-1">{errors.socialMedia.twitter.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Instagram
            </label>
            <div
              className="flex items-center border-[1px] border-gray-200 rounded-lg dark:border-[#404656]"
            >
              <span
                className="text-gray-500 bg-gray-100 py-2 px-4 h-full rounded-l-lg"
              >
                https://instagram.com/
              </span>
              <Controller
                control={control}
                name="socialMedia.instagram"
                render={({
                  field: {
                    onChange,
                    value,
                    ...rest
                  },
                }) => (
                  <input
                    className="w-full ps-2 py-2 pe-4 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-primary dark:bg-[#283046] dark:text-white"
                    value={value?.replace('https://instagram.com/', '')}
                    onChange={(e) => onChange(`https://instagram.com/${e.target.value}`)}
                    {...rest}
                  />
                )}
              />
            </div>
            {errors.socialMedia?.instagram
              && <p className="text-red-700 text-xs italic mt-1">{errors.socialMedia.instagram.message}</p>}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-primary text-white px-10 py-2 rounded-lg">
            Tiếp theo
          </button>
        </div>
      </form>
    </div>
  );
}
