import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  title: string,
  required?: boolean,
}

export default function Label(props: LabelProps) {
  const {
    title, required, className, ...rest
  } = props;

  return (
    <label
      className={`block mb-2 text-sm text-secondary ${className}`}
      {...rest}
    >
      {title}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}
