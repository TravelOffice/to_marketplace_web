import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import classNames from 'classnames';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean,
  toggle: () => void,
}

export default function Modal(props: ModalProps) {
  const { children, toggle, isOpen } = props;
  return (
    <div className={classNames('relative z-20', !isOpen ? 'hidden' : '')} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={classNames(
        'fixed z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-500',
        isOpen ? 'opacity-100' : 'opacity-0',
      )}
      />

      <div className="fixed inset-0 z-20 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className={classNames(
            'relative transform text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg',
            isOpen ? 'opacity-100 translate-y-0 sm:scale-100' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
          )}
          >
            <button
              type="button"
              className="absolute -top-3 -right-3 w-10 h-10 bg-white cursor-pointer rounded shadow transition-all hover:shadow-lg hover:translate-y-0.5 p-2"
              onClick={toggle}
            >
              <FaXmark className="w-6 h-6 text-gray-500" />
            </button>
            <div className="overflow-hidden rounded bg-white">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
