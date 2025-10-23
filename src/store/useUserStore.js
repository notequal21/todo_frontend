import { create } from 'zustand';
import { authApi } from '@/api/auth';

export const useUserStore = create((set, get) => ({
  user: null,
  loadingUser: false,

  fetchUser: async () => {
    set({ loadingUser: true });
    const data = await authApi.get();
    set({ user: data, loadingUser: false });
  },
}));
