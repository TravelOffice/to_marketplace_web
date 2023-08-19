import React from 'react';
import classNames from 'classnames';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Layout(props: LayoutProps) {
  const { children, className, ...rest } = props;

  return (
    <div {...rest} className={classNames('sm:ml-64 mt-0 pb-10', className)}>
      {children}
    </div>
  );
}
