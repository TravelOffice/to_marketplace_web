import React from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import ModalFooter from '@/components/base/Modal/ModalFooter';
import { Offer } from '@/models/TourPost/Offer';
import { useMarketplaceUser } from '@/hooks/marketplaceUser';
import { formatCurrency } from '@/utils/common';
import { useAcceptOfferMutation } from '@/hooks/offer';
import { ACCEPT_OFFER_SUCCESS, SOMETHING_WRONG } from '@/utils/constants';

export interface AcceptOfferModalProps extends ModalProps {
  readonly offer: Offer,
}

export default function AcceptOfferModal(props: AcceptOfferModalProps) {
  const queryClient = useQueryClient();
  const {
    offer,
    toggle,
  } = props;
  const { data: author } = useMarketplaceUser(offer?.authorId, !!offer);
  const {
    mutate,
  } = useAcceptOfferMutation({
    onSuccess: (acceptedOffer: Offer) => {
      toast.success(ACCEPT_OFFER_SUCCESS);
      queryClient.setQueryData(['offers_of_post', offer?.tourPostId], (input: Offer[] | undefined) => input?.map(
        (item) => (item.code === offer.code ? acceptedOffer : item),
      ));
      toggle();
    },
    onError: () => {
      toast.error(SOMETHING_WRONG);
    },
  });
  return (
    <Modal {...props} size="2xl">
      <ModalHeader>
        <h5 className="font-bold">Xác nhận yêu cầu</h5>
      </ModalHeader>
      <ModalBody>
        <p className="text-sm text-secondary dark:text-white mb-3">
          Bạn có chắc chắn muốn chấp nhận yêu cầu này?
        </p>
        <div className="flex flex-col text-sm gap-1">
          <span>
            Người gửi:
            {' '}
            <span className="font-medium">{author?.name}</span>
          </span>
        </div>
        <div>
          <span>
            Số lượng khách:
            {' '}
            <span
              className="font-medium"
            >
              {offer?.totalPax > 0 ? offer.totalPax : 'Không giới hạn'}
            </span>
          </span>
        </div>
        <div>
          <span>
            Chiết khấu:
            {' '}
            <span
              className="font-medium text-primary"
            >
              {formatCurrency(offer?.commission)}
              {' '}
              VND
            </span>
          </span>
        </div>
        <div>
          <span>
            Ghi chú thêm:
            {' '}
            <span className="font-medium">
              {offer?.description}
            </span>
          </span>
        </div>
      </ModalBody>
      <ModalFooter>
        <div>
          <button
            type="button"
            className="px-10 py-2 border text-gray-400 border-gray-400 rounded me-3 dark:text-gray-200 dark:border-gray-200"
            onClick={toggle}
          >
            Hủy
          </button>
          <button
            type="button"
            className=" px-10 py-2 bg-primary text-white rounded"
            onClick={() => mutate(offer?.code)}
          >
            Chấp nhận
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
