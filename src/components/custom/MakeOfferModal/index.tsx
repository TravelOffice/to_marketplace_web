import React from 'react';
import Modal, { ModalProps } from '@/components/base/Modal';
import Input from '@/components/base/Input';
import ModalHeader from '@/components/base/Modal/ModalHeader';
import ModalBody from '@/components/base/Modal/ModalBody';

export interface MakeOfferModalProps extends ModalProps {}

export default function MakeOfferModal(props: MakeOfferModalProps) {
  return (
    <Modal {...props}>
      <ModalHeader>
        Make offer
      </ModalHeader>
      <ModalBody>
        <form>
          <label htmlFor="numberOfPeople" className="block text-sm text-gray-700 mb-1">
            Number of people
            {' '}
            <span className="text-red-700">*</span>
          </label>
          <Input />
          <div className="grid grid-cols-3 gap-2">
            <label htmlFor="price" className="col-span-2 block text-sm text-gray-700 mb-1">
              Offer price
              {' '}
              <span className="text-red-700">*</span>
              <Input />
            </label>
            <label htmlFor="price" className="block text-sm text-gray-700 mb-1">
              Unit
              {' '}
              <span className="text-red-700">*</span>
              <Input />
            </label>
          </div>
          <button type="submit" className="w-full bg-primary text-white mb-5 font-medium text-sm px-5 py-2.5">
            Make offer
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
