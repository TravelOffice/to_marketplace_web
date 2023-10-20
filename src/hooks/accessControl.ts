import { hasAnyRole } from '@/utils/auth';
import { useCurrentUser } from '@/hooks/auth';

/**
 * Checks if the current user has any of the given roles.
 * @param roles The roles to check.
 * @returns True if the current user has any of the given roles, false otherwise.
 */
// eslint-disable-next-line import/prefer-default-export
export const useAccessControl = (...roles: string[]) => {
  const currentUser = useCurrentUser();
  return currentUser ? hasAnyRole(currentUser, roles) : false;
};
