import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export interface SidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
  path: string,
}

export default function SidebarItem(props: SidebarItemProps) {
  const { children, path, ...rest } = props;
  const location = useLocation();
  return (
    <li {...rest}>
      <Link
        to={path}
        className={classNames(
          'group transition-all px-4 flex items-center p-2 rounded-lg dark:text-white',
          path === location.pathname ? 'bg-primary dark:bg-gray-700 text-white' : 'text-secondary',
        )}
      >
        {children}
      </Link>
    </li>
  );
}
