import React from 'react';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import ModalFooter from '@/components/base/Modal/ModalFooter';

export interface AcceptOfferModalProps extends ModalProps {
  readonly onAccept: () => void,
}

export default function AcceptOfferModal(props: AcceptOfferModalProps) {
  const { onAccept, ...modalProps } = props;
  return (
    <Modal {...modalProps} size="2xl">
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
            <span className="font-medium">PYS Travel</span>
          </span>
        </div>
        <div>
          <span>
            Số lượng khách:
            {' '}
            <span className="font-medium">2 khách</span>
          </span>
        </div>
        <div>
          <span>
            Chiết khấu:
            {' '}
            <span className="font-medium text-primary">10%</span>
          </span>
        </div>
        <div>
          <span>
            Ghi chú thêm:
            {' '}
            <span className="font-medium">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores
              aspernatur atque autem commodi consequatur cumque cupiditate delectus dicta
            </span>
          </span>
        </div>
      </ModalBody>
      <ModalFooter>
        <div>
          <button
            type="button"
            className="px-10 py-2 border text-gray-400 border-gray-400 rounded me-3 dark:text-gray-200 dark:border-gray-200"
            onClick={modalProps.toggle}
          >
            Từ chối
          </button>
          <button
            type="button"
            className=" px-10 py-2 bg-primary text-white rounded"
            onClick={onAccept}
          >
            Chấp nhận
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
