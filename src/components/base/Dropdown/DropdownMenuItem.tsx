import React, { useContext } from 'react';
import { DropdownContext } from '@/components/base/Dropdown/DropdownContext';

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  onClick: () => void,
}

export default function DropdownMenuItem(props: DropdownMenuItemProps) {
  const { children, onClick, ...rest } = props;
  const { dispatch } = useContext(DropdownContext);
  const handleClick = () => {
    dispatch({ type: 'CLOSE' });
    onClick?.();
  };
  return (
    <li {...rest}>
      <button
        type="button"
        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
}
