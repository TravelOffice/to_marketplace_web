import React from 'react';
import DropdownMenu from '@/components/Dropdown/DropdownMenu';
import DropdownToggle from '@/components/Dropdown/DropdownToggle';
import DropdownProvider from '@/components/Dropdown/DropdownContext';

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

export { DropdownMenu, DropdownToggle };
