import { User } from '@/models/User/User';
import { LanguageType } from './LanguageType';
import { ThemeType } from './ThemeType';

export interface MarketplaceUser {
  // Attributes from Travel Office TravelUser
  organization: string, // Tenant ID
  username: string, // Username of the user in isolated tenant
  id: string, // Combination of tenant and username
  name: string, // Full name of the user
  phoneNumber: string, // Phone number of the user
  avatar?: string, // THe avatar of the user
  settings: {
    language?: LanguageType,
    theme?: ThemeType,
  },

  // New attributes for marketplace
  alias?: string, // Alias of the user, this will be displayed instead of user ID
  description?: string, // The description of the user
  roles: string[], // The roles of current user
  roleStr: string, // The roles string
  enabled: boolean,

  createdAt: number,
  updated: number,
}

export type UserWithRoles = User & { roles: string[] };

export type CreateMultipleUsersPayload = {
  users: Array<UserWithRoles>,
};
