import { create } from 'zustand';
import { listsApi } from '@/api/listsApi';

export const useListsStore = create((set, get) => ({
  lists: [],
  loadingLists: false,

  fetchLists: async () => {
    set({ loadingLists: true });
    const data = await listsApi.getAll();
    set({ lists: data, loadingLists: false });
  },

  addList: async (text) => {
    set({ loadingLists: true });
    const newList = await listsApi.create(text);
    set({ lists: [...get().lists, newList] });
    set({ loadingLists: false });
  },

  editList: async (id, text) => {
    set({ loadingLists: true });
    const updated = await listsApi.update(id, text);
    set({
      lists: get().lists.map((t) => (t.id === id ? updated : t)),
    });
    set({ loadingLists: false });
  },

  deleteList: async (id) => {
    set({ loadingLists: true });
    await listsApi.delete(id);
    set({
      lists: get().lists.filter((t) => t.id !== id),
    });
    set({ loadingLists: false });
  },
}));
