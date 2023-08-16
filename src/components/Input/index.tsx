import React from 'react';
import classNames from 'classnames';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {

}

export default function Input(props: InputProps) {
  const {
    className,
    ...rest
  } = props;
  return (
    <input
      className={classNames(
        'border-[1px] w-full h-8 mb-5 p-2.5 text-gray-900 text-sm',
        'focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none',
        className,
      )}
      {...rest}
    />
  );
}
