import React from 'react';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function ModalHeader(props: ModalHeaderProps) {
  const { children } = props;
  return (
    <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
}
