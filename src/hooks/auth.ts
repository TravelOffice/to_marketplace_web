import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { isTokenExpired } from '@/utils/jwt';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';

export interface AuthState {
  currentUser: MarketplaceUser | null,
  setCurrentUser: (user: MarketplaceUser) => void,
  accessToken: string | null,
  logIn: (token: string) => void,
  logOut: () => void,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      accessToken: null,
      logIn: (token: string) => {
        set(() => ({ accessToken: token }));
      },
      logOut: () => set(() => ({ accessToken: null })),
      setCurrentUser: (user: MarketplaceUser) => set(() => ({ currentUser: user })),
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
    setCurrentUser,
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
    accessToken,
    isLoggedIn: !!accessToken,
    currentUser,
    setCurrentUser,
  };
}

export const useCurrentUser = () => useAuthStore((state) => state.currentUser);
