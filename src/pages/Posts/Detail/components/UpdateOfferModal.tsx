import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import { Offer, UpdateOfferFormData } from '@/models/TourPost/Offer';
import { useUpdateOfferMutation } from '@/hooks/offer';
import { CREATE_SUCCESS, SOMETHING_WRONG } from '@/utils/constants';

export interface UpdateOfferModalProps extends ModalProps {
  offer: Offer,
}

const schema: ObjectSchema<UpdateOfferFormData> = yup.object()
  .shape({
    totalPax: yup.number()
      .typeError('Giá trị không hợp lệ')
      .min(-1, 'Giá trị không hợp lệ')
      .required(),
    pricePerPax: yup.number()
      .typeError('Giá trị không hợp lệ')
      .min(1, 'Giá trị không hợp lệ')
      .required(),
    commission: yup.number()
      .typeError('Giá trị không hợp lệ')
      .min(1, 'Giá trị không hợp lệ')
      .required(),
    description: yup.string(),
    unlimited: yup.boolean()
      .required(),
  });
export default function UpdateOfferModal(props: UpdateOfferModalProps) {
  const queryClient = useQueryClient();
  const {
    offer,
    ...rest
  } = props;
  const {
    isOpen,
    toggle,
  } = rest;
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UpdateOfferFormData>(
    {
      resolver: yupResolver(schema),
    },
  );

  useEffect(() => {
    if (offer || isOpen) {
      reset(offer);
    }
  }, [offer, isOpen]);

  const {
    mutate,
    isLoading,
  } = useUpdateOfferMutation(offer?.code, {
    onSuccess: (updatedOffer: Offer) => {
      toast.success(CREATE_SUCCESS);
      reset();
      queryClient.setQueryData(['offers_of_post', offer?.tourPostId], (input: Offer[] | undefined) => input?.map(
        (item) => (item.code === updatedOffer.code ? updatedOffer : item),
      ));
      toggle();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const onUpdateOffer = (data: UpdateOfferFormData) => mutate(data);
  return (
    <Modal {...rest} size="xl">
      <ModalHeader>
        Cập nhật yêu cầu
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onUpdateOffer)}>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <label
              htmlFor="pricePerpax"
              className="col-span-2 block text-sm text-gray-700 mb-1 dark:text-white"
            >
              Giá/khách
              {' '}
              <span className="text-red-700">*</span>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                )}
                type="number"
                {...register('pricePerPax')}
              />
              {errors.pricePerPax
                && <p className="text-red-700 text-xs italic">{errors.pricePerPax.message}</p>}
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <label htmlFor="totalPax" className="block text-sm text-gray-700 mb-1 dark:text-white">
              Số lượng khách
              {' '}
              <span className="text-red-700">*</span>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                  'disabled:text-gray-600',
                )}
                type="number"
                {...register('totalPax')}
              />
              {errors.totalPax
                && <p className="text-red-700 text-xs italic">{errors.totalPax.message}</p>}
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <label
              htmlFor="commission"
              className="col-span-2 block text-sm text-gray-700 mb-1 dark:text-white"
            >
              Chiết khấu
              {' '}
              <span className="text-red-700">*</span>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                )}
                type="number"
                {...register('commission')}
              />
              {errors.commission
                && <p className="text-red-700 text-xs italic">{errors.commission.message}</p>}
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label
              htmlFor="commission"
              className="col-span-3 block text-sm text-gray-700 mb-1 dark:text-white"
            >
              Mô tả
              <textarea
                rows={4}
                className={classNames(
                  'border-[1px] w-full h-32 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                )}
                {...register('description')}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white mb-5 font-medium text-sm px-5 py-2.5"
            disabled={isLoading}
          >
            Cập nhật yêu cầu
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
