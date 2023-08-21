import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { isTokenExpired } from '@/utils/jwt';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import authorizedRequest from '@/services/authorizedRequest';

export interface AuthState {
  currentUser: MarketplaceUser | null,
  accessToken: string | null,
  logIn: (token: string) => void,
  logOut: () => void,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      accessToken: null,
      logIn: async (token: string) => {
        set(() => ({ accessToken: token }));
        authorizedRequest.accessToken = token;
        const currentUser = await authorizedRequest.get('/me');
        set(() => ({ currentUser }));
      },
      logOut: () => set(() => ({ accessToken: null })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useAuth() {
  const {
    accessToken,
    logIn,
    currentUser,
  } = useAuthStore();
  const location = useLocation();
  const { search: query } = location;
  const params = new URLSearchParams(query);
  const idToken = params.get('id_token');

  useEffect(() => {
    if (isTokenExpired(idToken || accessToken)) {
      window.location.href = `${import.meta.env.VITE_SSO}?redirect_uri=${window.location.href}`;
    }
  }, [idToken, accessToken]);

  useEffect(() => {
    if (idToken) {
      logIn(idToken);
    }
  }, [idToken, logIn]);

  return {
    accessToken: idToken || accessToken,
    isLoggedIn: !!idToken || !!accessToken,
    currentUser,
  };
}
