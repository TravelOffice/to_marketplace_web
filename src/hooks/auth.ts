import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { isTokenExpired } from '@/utils/jwt';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import { getDeviceInfo } from '@/utils/deviceInfo';

export interface AuthState {
  currentUser: MarketplaceUser | undefined,
  setCurrentUser: (user: MarketplaceUser) => void,
  updateCurrentUser: (data: Partial<MarketplaceUser>) => void,
  accessToken: string | null,
  logIn: (token: string) => void,
  logOut: () => void,
  deviceToken?: string,
  setDeviceToken: (token: string) => void,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: undefined,
      accessToken: null,
      logIn: (token: string) => {
        set(() => ({ accessToken: token }));
      },
      logOut: () => set(() => ({ accessToken: null, currentUser: undefined })),
      setCurrentUser: (user: MarketplaceUser) => set(() => ({ currentUser: user })),
      updateCurrentUser: (data: Partial<MarketplaceUser>) => set((state) => {
        if (!state.currentUser) return state;
        return {
          currentUser: {
            ...state.currentUser,
            ...data,
          },
        };
      }),
      setDeviceToken: (token: string) => set(() => ({ deviceToken: token })),
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

export const useUpdateCurrentUser = () => useAuthStore((state) => state.updateCurrentUser);

export const useRegisterDeviceToken = () => {
  const { accessToken, deviceToken } = useAuthStore();
  useEffect(() => {
    if (accessToken && deviceToken) {
      // Use fetch instead of axios to avoid circular dependency
      const { os, browser } = getDeviceInfo();
      fetch(`${import.meta.env.VITE_API_URL}/notifications/sessions`, {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appType: 'MARKETPLACE',
          type: 'BROWSER',
          token: deviceToken,
          userAgent: navigator.userAgent,
          name: browser,
          os,
        }),
      }).catch();
    }
  }, [accessToken]);
};
