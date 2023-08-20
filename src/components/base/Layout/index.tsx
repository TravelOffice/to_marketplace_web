import React from 'react';
import classNames from 'classnames';
import { useLayoutStore } from '@/hooks/layout';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Layout(props: LayoutProps) {
  const { children, className, ...rest } = props;
  const isSidebarOpen = useLayoutStore((state) => state.isSidebarOpen);

  return (
    <div {...rest} className={classNames('mt-0 pb-10 transition-all', isSidebarOpen ? 'sm:ml-64' : 'sm:ml-20', className)}>
      {children}
    </div>
  );
}
