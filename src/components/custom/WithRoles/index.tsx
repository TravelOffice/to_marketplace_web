import React from 'react';
import { useAccessControl } from '@/hooks/accessControl';
import AccessDenied from '@/components/custom/AccessDenied';

export interface WithRolesProps {
  roles: string[],
  children: React.ReactNode,
  accessDeniedComponent?: React.ReactNode,
}

export default function WithRoles(props: WithRolesProps) {
  const { roles, children, accessDeniedComponent } = props;
  const accessControl = useAccessControl(...roles);
  if (accessControl) return children;
  return accessDeniedComponent || <AccessDenied />;
}
