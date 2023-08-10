import React from 'react';

export interface NavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string,
}

export default function NavLink(props: NavLinkProps) {
  const { href, children } = props;
  return (
    <a href={href} className="text-black px-3 py-2 rounded-md">
      {children}
    </a>
  );
}
