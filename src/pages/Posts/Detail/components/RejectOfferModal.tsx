import React from 'react';
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import ModalFooter from '@/components/base/Modal/ModalFooter';
import { Offer, RejectOfferFormData } from '@/models/TourPost/Offer';
import { useRejectOfferMutation } from '@/hooks/offer';
import { REJECT_OFFER_SUCCESS, SOMETHING_WRONG } from '@/utils/constants';

export interface RejectOfferModalProps extends ModalProps {
  readonly offer: Offer;
}

const schema: ObjectSchema<RejectOfferFormData> = yup.object()
  .shape({
    rejectReason: yup.string()
      .required('Vui lòng nhập lý do'),
  });

export default function RejectOfferModal(props: RejectOfferModalProps) {
  const queryClient = useQueryClient();
  const {
    offer,
    toggle,
  } = props;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RejectOfferFormData>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        rejectReason: undefined,
      },
    },
  );
  const {
    mutate,
  } = useRejectOfferMutation(offer?.code, {
    onSuccess: (rejectedOffer: Offer) => {
      toast.success(REJECT_OFFER_SUCCESS);
      queryClient.setQueryData(['offers_of_post', offer?.tourPostId], (input: Offer[] | undefined) => input?.map(
        (item) => (item.code === offer.code ? rejectedOffer : item),
      ));
      toggle();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const onRejectOffer = (data: RejectOfferFormData) => mutate(data);

  return (
    <Modal {...props} size="2xl">
      <Form onSubmit={handleSubmit(onRejectOffer)}>
        <ModalHeader>Từ chối yêu cầu</ModalHeader>
        <ModalBody>
          <p className="text-sm text-secondary dark:text-white mb-3">
            Bạn có chắc chắn muốn từ chối yêu cầu này?
          </p>

          <div className="mb-3">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Lý do từ chối
            </label>
            <textarea
              {...register('rejectReason')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#283046] dark:text-white px-4 py-2.5 text-sm"
              rows={5}
              placeholder="Nhập lý do từ chối..."
            />
            {errors.rejectReason
              && <p className="text-red-700 text-xs italic mt-1">{errors.rejectReason.message}</p>}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="px-10 py-2 border text-gray-400 border-gray-400 rounded me-3 dark:text-gray-200 dark:border-gray-200"
            onClick={toggle}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-10 py-2 border text-white border-primary rounded bg-primary"
          >
            Xác nhận
          </button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
