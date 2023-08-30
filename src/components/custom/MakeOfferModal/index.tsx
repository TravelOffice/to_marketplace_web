import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import { CreateOfferFormData } from '@/models/TourPost/Offer';
import { useCreateOfferMutation } from '@/hooks/offer';
import { CREATE_SUCCESS, SOMETHING_WRONG } from '@/utils/constants';

export interface MakeOfferModalProps extends ModalProps {
  tourPostId: string,
}

const schema: ObjectSchema<CreateOfferFormData> = yup.object()
  .shape({
    tourPostId: yup.string()
      .required(),
    totalPax: yup.number()
      .typeError('Giá trị không hợp lệ')
      .min(-1, 'Giá trị không hợp lệ')
      .required(),
    pricePerPax: yup.number()
      .typeError('Giá trị không hợp lệ')
      .min(1, 'Giá trị không hợp lệ')
      .required(),
    commissionRate: yup.number()
      .typeError('Giá trị không hợp lệ')
      .min(1, 'Giá trị không hợp lệ')
      .required(),
    description: yup.string(),
    unlimited: yup.boolean()
      .required(),
  });
export default function MakeOfferModal(props: MakeOfferModalProps) {
  const {
    tourPostId,
    ...rest
  } = props;
  const {
    toggle,
  } = rest;
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateOfferFormData>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        tourPostId,
        description: '',
        totalPax: 0,
        pricePerPax: 0,
        commissionRate: 0,
        unlimited: true,
      },
    },
  );

  const unlimited = useWatch({
    control,
    name: 'unlimited',
  });

  const {
    mutate,
    isLoading,
  } = useCreateOfferMutation({
    onSuccess: () => {
      toast.success(CREATE_SUCCESS);
      reset();
      toggle();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const onSendOffer = (data: CreateOfferFormData) => {
    const {
      unlimited: deletedAtt,
      ...restData
    } = data;
    if (deletedAtt) {
      return mutate({
        ...restData,
        totalPax: -1,
      } as CreateOfferFormData);
    }
    return mutate(data);
  };
  return (
    <Modal {...rest} size="xl">
      <ModalHeader>
        Taọ yêu cầu
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSendOffer)}>
          <input value={tourPostId} hidden {...register('tourPostId')} />
          <div className="grid grid-cols-3 gap-2 mb-2">
            <label htmlFor="pricePerpax" className="col-span-2 block text-sm text-gray-700 mb-1">
              Giá/khách
              {' '}
              <span className="text-red-700">*</span>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                  'focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none',
                )}
                type="number"
                {...register('pricePerPax')}
              />
              {errors.pricePerPax
                && <p className="text-red-700 text-xs italic">{errors.pricePerPax.message}</p>}
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <label htmlFor="totalPax" className="block text-sm text-gray-700 mb-1">
              Số lượng khách
              {' '}
              <span className="text-red-700">*</span>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                  'focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none disabled:text-gray-600',
                )}
                type="number"
                disabled={unlimited}
                {...register('totalPax')}
              />
              {errors.totalPax
                && <p className="text-red-700 text-xs italic">{errors.totalPax.message}</p>}
            </label>
            <label htmlFor="unlimited" className="block text-sm text-gray-700 mt-8 mb-1">
              <input
                type="checkbox"
                {...register('unlimited')}
              />
              {' '}
              Không giới hạn
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <label htmlFor="commissionRate" className="col-span-2 block text-sm text-gray-700 mb-1">
              Chiết khấu
              {' '}
              <span className="text-red-700">*</span>
              <input
                className={classNames(
                  'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                  'focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none',
                )}
                type="number"
                {...register('commissionRate')}
              />
              {errors.commissionRate
                && <p className="text-red-700 text-xs italic">{errors.commissionRate.message}</p>}
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label htmlFor="commissionRate" className="col-span-3 block text-sm text-gray-700 mb-1">
              Mô tả
              <textarea
                rows={4}
                className={classNames(
                  'border-[1px] w-full h-32 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
                  'focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none',
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
            Gửi yêu cầu
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
