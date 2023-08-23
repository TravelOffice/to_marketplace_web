import React from 'react';
import Modal, { ModalProps } from '@/components/base/Modal';
import accessDenied from '@/assets/images/illustrator/access-denied.svg';
import ModalBody from '@/components/base/Modal/ModalBody';

export interface AccessDeniedModalProps extends ModalProps {
}

export default function AccessDeniedModal(props: AccessDeniedModalProps) {
  return (
    <Modal {...props}>
      <ModalBody>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <img src={accessDenied} alt="" className="w-48 mb-5" />
          <h5 className="text-xl font-semibold">Quý khách không có quyền thực hiện chức năng này</h5>
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            Hãy đảm bảo quý khách đã đăng nhập bằng tài khoản root.
            Vui lòng liên hệ với quản trị viên để được hỗ trợ thêm.
          </p>
          <button type="button" className="px-10 w-full mt-5 rounded py-2.5 text-center bg-primary text-white font-semibold">
            Đóng
          </button>
          <p className="mt-5 text-sm text-gray-500 dark:text-white">
            hoặc
            {' '}
            <a className="text-primary underline" href={`${import.meta.env.VITE_SSO}/sign-out?redirect_uri=${window.location.origin}`}>đăng xuất tại đây</a>
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
}
