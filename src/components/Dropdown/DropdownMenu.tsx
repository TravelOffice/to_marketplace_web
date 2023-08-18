import React, { useContext } from 'react';
import ReactPortal from '@/components/ReactPortal';
import { DropdownContext } from '@/components/Dropdown/DropdownContext';

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function DropdownMenu(props: DropdownMenuProps) {
  const { children, ...rest } = props;
  const { isOpen, coords } = useContext(DropdownContext);
  return (
    <ReactPortal wrapperId="react-portal-dropdown">
      <div {...rest}>
        {
          isOpen && (
            <div
              className="text-left absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              style={{ left: coords.x, top: coords.y }}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                  {children}
                </ul>
              </div>
            </div>
          )
        }
      </div>
    </ReactPortal>
  );
}
