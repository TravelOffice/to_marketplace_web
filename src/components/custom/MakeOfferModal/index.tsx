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
import { CreateOfferFormData, Offer } from '@/models/TourPost/Offer';
import { useCreateOfferMutation } from '@/hooks/offer';
import { CREATE_SUCCESS, SOMETHING_WRONG } from '@/utils/constants';
import { TourPost } from '@/models/TourPost/TourPost';

export interface MakeOfferModalProps extends ModalProps {
  post: TourPost
}

const schema: ObjectSchema<CreateOfferFormData> = yup.object()
  .shape({
    tourPostId: yup.string()
      .required(),
    totalPax: yup.number()
      .typeError('Giá trị không hợp lệ')
      .min(1, 'Giá trị không hợp lệ')
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
  });
export default function MakeOfferModal(props: MakeOfferModalProps) {
  const queryClient = useQueryClient();
  const {
    post,
    ...rest
  } = props;
  const {
    toggle,
  } = rest;
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateOfferFormData>(
    {
      resolver: yupResolver(schema),
    },
  );

  useEffect(() => {
    if (post) {
      reset({
        tourPostId: post.code,
        pricePerPax: post.pricePerPax,
        totalPax: 1,
        commission: post.commission,
      });
    }
  }, [post]);

  const {
    mutate,
    isLoading,
  } = useCreateOfferMutation({
    onSuccess: (newOffer: Offer) => {
      toast.success(CREATE_SUCCESS);
      reset();
      queryClient.setQueryData(['offers_of_post', post?.code], (input: Offer[] | undefined) => input?.concat(newOffer));
      toggle();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const onSendOffer = (data: CreateOfferFormData) => mutate(data);
  return (
    <Modal {...rest} size="xl">
      <ModalHeader>
        Taọ yêu cầu
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSendOffer)}>
          <input value={post?.code} hidden {...register('tourPostId')} />
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
              {errors.description
                && <p className="text-red-700 text-xs italic">{errors.description.message}</p>}
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
