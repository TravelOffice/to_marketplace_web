import React from 'react';
import DropdownMenu from '@/components/base/Dropdown/DropdownMenu';
import DropdownMenuItem from '@/components/base/Dropdown/DropdownMenuItem';
import DropdownToggle from '@/components/base/Dropdown/DropdownToggle';
import DropdownProvider from '@/components/base/Dropdown/DropdownContext';

export interface DropdownProps {
  children: React.ReactNode,
}

export default function Dropdown(props: DropdownProps) {
  const { children } = props;
  return (
    <DropdownProvider>
      {children}
    </DropdownProvider>
  );
}

export { DropdownMenu, DropdownToggle, DropdownMenuItem };
