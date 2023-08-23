import React, { useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { CSSTransition } from 'react-transition-group';
import ReactPortal from '@/components/base/ReactPortal';
import '@/styles/extended/modal.css';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean,
  toggle: () => void,
}

export default function Modal(props: ModalProps) {
  const {
    children,
    toggle,
    isOpen,
  } = props;

  const nodeRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? toggle() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [toggle]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={1000}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal relative z-20" role="dialog" ref={nodeRef}>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div
              className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <CSSTransition
                in={isOpen}
                timeout={1000}
                unmountOnExit
                classNames="modal-content"
                nodeRef={contentRef}
              >
                <div
                  ref={contentRef}
                  className="modal-content"
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
              </CSSTransition>
            </div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}
