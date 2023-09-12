import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import { useCurrentUser, useUpdateCurrentUser } from '@/hooks/auth';
import ModalFooter from '@/components/base/Modal/ModalFooter';
import { UpdateProfileFormData } from '@/models/MarketplaceUser/MarketplaceUser';
import { useUpdateProfileMutation } from '@/hooks/marketplaceUser';
import { UPDATE_SUCCESS, VALIDATION_MESSAGE } from '@/utils/constants';
import Spinner from '@/components/base/Spinner';

export interface UpdateProfileModalProps extends ModalProps {
}

const schema: yup.ObjectSchema<UpdateProfileFormData> = yup.object().shape({
  name: yup.string().required(VALIDATION_MESSAGE.required('Họ và tên')),
  phoneNumber: yup.string().required().matches(/^(?:\+?84|0)(\d{9,10})$/, VALIDATION_MESSAGE.invalidPhoneNumber()),
  description: yup.string().max(100, VALIDATION_MESSAGE.maxLength('Mô tả', 100)),
});

export default function UpdateProfileModal(props: UpdateProfileModalProps) {
  const { ...modalProps } = props;
  const { toggle } = modalProps;
  const currentUser = useCurrentUser();
  const updateCurrentUser = useUpdateCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!currentUser) return;
    reset({
      name: currentUser.name,
      phoneNumber: currentUser.phoneNumber,
      description: currentUser.description,
    });
  }, [currentUser]);

  const { mutate, isLoading } = useUpdateProfileMutation({
    onSuccess: (_, formData) => {
      toggle();
      toast.success(UPDATE_SUCCESS);
      updateCurrentUser(formData);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback((formData: UpdateProfileFormData) => {
    mutate(formData);
  }, []);

  return (
    <Modal {...modalProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          Cập nhật thông tin cá nhân
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col">
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold text-sm" htmlFor="name">
                Họ và tên
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="border border-neutral-300 rounded px-4 py-2.5 text-sm w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:bg-dark dark:border-gray-600"
                placeholder="Nhập họ và tên"
                {...register('name', { required: true })}
              />
              {
                errors.name
                && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
              }
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold text-sm" htmlFor="phone">
                Số điện thoại
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                className="border border-neutral-300 rounded px-4 py-2.5 text-sm w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:bg-dark dark:border-gray-600"
                placeholder="Nhập số điện thoại"
                {...register('phoneNumber', { required: true })}
              />
              {
                errors.phoneNumber
                && <span className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</span>
              }
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold text-sm" htmlFor="description">
                Mô tả (tối đa 100 ký tự)
              </label>
              <textarea
                id="description"
                className="border border-neutral-300 rounded px-4 py-2.5 text-sm w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none dark:bg-dark dark:border-gray-600"
                placeholder="Nhập mô tả về bản thân"
                rows={5}
                {...register('description', { required: true })}
              />
              {
                errors.description
                && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
              }
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
