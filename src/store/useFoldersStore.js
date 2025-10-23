import { create } from 'zustand';
import { folderApi } from '@/api/folderApi';

export const useFoldersStore = create((set, get) => ({
  folders: [],
  loadingFolders: false,

  fetchFolders: async () => {
    set({ loadingFolders: true });
    const data = await folderApi.getAll();
    set({ folders: data, loadingFolders: false });
  },

  addFolder: async (text) => {
    set({ loadingFolders: true });
    const newFolder = await folderApi.create(text);
    set({ folders: [...get().folders, newFolder] });
    set({ loadingFolders: false });
  },

  editFolder: async (id, text) => {
    set({ loadingFolders: true });
    const updated = await folderApi.update(id, text);
    set({ folders: get().folders.map((f) => (f.id === id ? updated : f)) });
    set({ loadingFolders: false });
  },

  deleteFolder: async (id) => {
    set({ loadingFolders: true });
    await folderApi.delete(id);
    set({ folders: get().folders.filter((f) => f.id !== id) });
    set({ loadingFolders: false });
  },
}));
