import React, { HTMLInputTypeAttribute } from 'react';
import classNames from 'classnames';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute,
}

export default function Input(props: InputProps) {
  const {
    className,
    ...rest
  } = props;
  return (
    <input
      className={classNames(
        'border-[1px] w-full h-8 mb-1 p-2.5 text-gray-900 text-sm dark:bg-[#283046] dark:text-white dark:border-gray-700',
        'focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none',
        className,
      )}
      {...rest}
    />
  );
}
