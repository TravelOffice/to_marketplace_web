import React from 'react';
import Modal, { ModalProps } from '@/components/base/Modal';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';
import ModalFooter from '@/components/base/Modal/ModalFooter';

export interface RejectOfferModalProps extends ModalProps {
}

export default function RejectOfferModal(props: RejectOfferModalProps) {
  const { toggle } = props;
  return (
    <Modal {...props} size="2xl">
      <form>
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
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#283046] dark:text-white px-4 py-2.5 text-sm"
              rows={5}
              placeholder="Nhập lý do từ chối..."
            />
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
      </form>
    </Modal>
  );
}
