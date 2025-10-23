import { create } from 'zustand';
import { boardApi } from '@/api/boardApi';

export const useBoardsStore = create((set, get) => ({
  boards: [],
  loadingBoards: false,

  fetchBoards: async () => {
    set({ loadingBoards: true });
    const data = await boardApi.getAll();
    set({ boards: data, loadingBoards: false });
  },

  addBoard: async (text, folderId) => {
    set({ loadingBoards: true });
    const newBoard = await boardApi.create(text, folderId);
    set({ boards: [...get().boards, newBoard] });
    set({ loadingBoards: false });
  },

  editBoard: async (id, text, folderId) => {
    set({ loadingBoards: true });
    const updated = await boardApi.update(id, text, folderId);
    set({
      boards: get().boards.map((b) => (b.id === id ? updated : b)),
    });
    set({ loadingBoards: false });
  },

  deleteBoard: async (id) => {
    set({ loadingBoards: true });
    await boardApi.delete(id);
    set({ boards: get().boards.filter((b) => b.id !== id) });
    set({ loadingBoards: false });
  },
}));
