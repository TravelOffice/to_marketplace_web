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
import { CancelOfferFormData, Offer } from '@/models/TourPost/Offer';
import { useCancelOfferMutation } from '@/hooks/offer';
import { CANCEL_OFFER_SUCCESS, SOMETHING_WRONG } from '@/utils/constants';

interface CancelOfferModalProps extends ModalProps {
  readonly offer: Offer;
}

const schema: ObjectSchema<CancelOfferFormData> = yup.object()
  .shape({
    cancelReason: yup.string()
      .required('Vui lòng nhập lý do'),
  });

export default function CancelOfferModal(props: CancelOfferModalProps) {
  const queryClient = useQueryClient();
  const {
    offer,
    toggle,
  } = props;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CancelOfferFormData>(
    {
      resolver: yupResolver(schema),
      defaultValues: {
        cancelReason: undefined,
      },
    },
  );
  const {
    mutate,
  } = useCancelOfferMutation(offer?.code, {
    onSuccess: (canceledOffer: Offer) => {
      toast.success(CANCEL_OFFER_SUCCESS);
      queryClient.setQueryData(['offers_of_post', offer?.tourPostId], (input: Offer[] | undefined) => input?.map(
        (item) => (item.code === offer.code ? canceledOffer : item),
      ));
      toggle();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });

  const onCancelOffer = (data: CancelOfferFormData) => mutate(data);

  return (
    <Modal {...props} size="2xl">
      <Form onSubmit={handleSubmit(onCancelOffer)}>
        <ModalHeader>Hủy yêu cầu</ModalHeader>
        <ModalBody>
          <p className="text-sm text-secondary dark:text-white mb-3">
            Bạn có chắc chắn muốn hủy yêu cầu này?
          </p>

          <div className="mb-3">
            <label className="block mb-2 text-sm text-secondary dark:text-white" htmlFor="title">
              Lý do hủy
            </label>
            <textarea
              {...register('cancelReason')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#283046] dark:text-white px-4 py-2.5 text-sm"
              rows={5}
              placeholder="Nhập lý do hủy..."
            />
            {errors.cancelReason
              && <p className="text-red-700 text-xs italic mt-1">{errors.cancelReason.message}</p>}
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
