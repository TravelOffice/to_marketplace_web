import React from 'react';
import Navbar from '@/components/base/Navbar';
import Footer from '@/components/base/Footer';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Layout(props: LayoutProps) {
  const { children, ...rest } = props;

  return (
    <div {...rest}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
