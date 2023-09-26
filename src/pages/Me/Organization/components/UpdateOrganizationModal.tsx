import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import { useCurrentUser } from '@/hooks/auth';
import ModalFooter from '@/components/base/Modal/ModalFooter';
import { SOMETHING_WRONG, UPDATE_SUCCESS, VALIDATION_MESSAGE } from '@/utils/constants';
import Spinner from '@/components/base/Spinner';
import { Organization, UpdateOrganizationFormData } from '@/models/Organization/Organization';
import { useOrganization, useUpdateOrganization } from '@/hooks/organization';

export interface UpdateOrganizationModalProps extends ModalProps {
}

const schema: yup.ObjectSchema<UpdateOrganizationFormData> = yup.object()
  .shape({
    name: yup.string()
      .required(VALIDATION_MESSAGE.required('Họ và tên')),
    email: yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),
    phoneNumber: yup.string()
      .required()
      .matches(/^(?:\+?84|0)(\d{9,10})$/, VALIDATION_MESSAGE.invalidPhoneNumber()),
    address: yup.string(),
    employeesCount: yup.number()
      .typeError('Vui lòng nhập số lượng nhân viên'),
    foundedYear: yup.number()
      .typeError('Vui lòng nhập số lượng nhân viên'),
    website: yup.string()
      .url('Website không hợp lệ'),
    socialMedia: yup.object()
      .shape({
        facebook: yup.string()
          .url('Facebook không hợp lệ'),
        twitter: yup.string()
          .url('Twitter không hợp lệ'),
        zalo: yup.string()
          .url('Zalo không hợp lệ'),
        instagram: yup.string()
          .url('Instagram không hợp lệ'),
      }),
  });

export default function UpdateOrganizationModal(props: UpdateOrganizationModalProps) {
  const { ...modalProps } = props;
  const {
    isOpen,
    toggle,
  } = modalProps;
  const currentUser = useCurrentUser();
  const { data: organization } = useOrganization(currentUser?.organization!, !!currentUser);
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateOrganizationFormData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!organization) return;
    reset(organization);
  }, [organization, isOpen]);

  const {
    mutate,
    isLoading,
  } = useUpdateOrganization(organization?.code!, {
    onSuccess: (updatedOrganization: Organization) => {
      // Show success toast
      toast.success(UPDATE_SUCCESS);
      queryClient.setQueryData(['organization', updatedOrganization.code], () => updatedOrganization);
      toggle();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const onSubmit = useCallback((formData: UpdateOrganizationFormData) => {
    mutate(formData);
  }, []);

  return (
    <Modal {...modalProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          Cập nhật thông tin công ty
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col">
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
                <span className="text-red-700">*</span>
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
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="border border-neutral-300 rounded px-5 py-2.5 text-sm font-semibold flex items-center gap-3 hover:bg-neutral-100 dark:hover:bg-dark transition-colors me-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={toggle}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-primary text-white rounded px-5 py-2.5 text-sm font-semibold flex items-center gap-3 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {
              isLoading && <Spinner className="w-3 h-3 me-1" />
            }
            Cập nhật
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
