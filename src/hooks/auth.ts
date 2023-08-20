import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { isTokenExpired } from '@/utils/jwt';

export interface AuthState {
  accessToken: string | null,
  logIn: (token: string) => void,
  logOut: () => void,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      logIn: (token: string) => set(() => ({ accessToken: token })),
      logOut: () => set(() => ({ accessToken: null })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useAuth() {
  const { accessToken, logIn } = useAuthStore();
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
  };
}
