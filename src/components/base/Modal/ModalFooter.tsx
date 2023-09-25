import React from 'react';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ModalFooter(props: ModalFooterProps) {
  const { children } = props;
  return (
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:justify-end sm:px-6 dark:bg-dark">
      {children}
    </div>
  );
}
