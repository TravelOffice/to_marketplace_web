import React from 'react';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {

}

export default function ModalBody(props: ModalBodyProps) {
  const { children } = props;
  return (
    <div className="mt-2 px-4 pb-4 sm:px-6 sm:pb-4">
      <div className="mt-3 text-center sm:mx-4 sm:mt-0 sm:text-left">
        {children}
      </div>
    </div>
  );
}
