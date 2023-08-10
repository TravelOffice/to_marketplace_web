import React from 'react';
import Navbar from '@/components/Navbar';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
