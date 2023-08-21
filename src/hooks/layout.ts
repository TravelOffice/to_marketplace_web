import { create } from 'zustand';

export interface LayoutState {
  isSidebarOpen: boolean,
  toggleSidebar: () => void,
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
