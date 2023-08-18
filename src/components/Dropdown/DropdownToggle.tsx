import React, { useCallback, useContext, useRef } from 'react';
import { DropdownContext } from '@/components/Dropdown/DropdownContext';

export interface DropdownToggleProps extends React.HTMLAttributes<HTMLButtonElement> {

}

export default function DropdownToggle(props: DropdownToggleProps) {
  const {
    children,
    onClick,
    className = 'text-left text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center',
    ...rest
  } = props;

  const { dispatch, isOpen } = useContext(DropdownContext);

  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    if (isOpen) {
      dispatch({ type: 'CLOSE' });
    } else {
      const rect = ref.current!.getBoundingClientRect();
      dispatch({
        type: 'OPEN',
        payload: {
          x: rect.x,
          y: rect.y + window.scrollY + rect.height,
        },
      });
    }
  }, [isOpen, ref]);

  return (
    <button ref={ref} type="button" className={className} {...rest} onClick={handleClick}>
      {children}
    </button>
  );
}
