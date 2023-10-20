import { useAuthStore } from '@/hooks/auth';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';

export function getAccessToken() {
  return useAuthStore.getState().accessToken;
}

/**
 * Check if user has a specific role
 * @param user User to check
 * @param role Role to check
 * @returns {boolean} True if user has role, false otherwise
 */
export function hasRole(user: MarketplaceUser, role: string) {
  return user.roles?.includes(role);
}

/**
 * Check if user has any role in a list of roles
 * @param user User to check
 * @param roles List of roles to check
 * @returns {boolean} True if user has any role, false otherwise
 */
export function hasAnyRole(user: MarketplaceUser, roles: string[]) {
  return roles.some((role) => hasRole(user, role));
}

/**
 * Check if user has all roles in a list of roles
 * @param user User to check
 * @param roles List of roles to check
 * @returns {boolean} True if user has all roles, false otherwise
 */
export function hasAllRoles(user: MarketplaceUser, roles: string[]) {
  return roles.every((role) => hasRole(user, role));
}
