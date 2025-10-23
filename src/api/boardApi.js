import { api } from './axios';

const BASE_URL = '/boards';

export const boardApi = {
  getAll: async () => (await api.get(BASE_URL)).data,
  create: async (text, folderId) =>
    (await api.post(BASE_URL, { title: text, folderId: folderId })).data,
  update: async (id, text, folderId) =>
    (await api.put(`${BASE_URL}/${id}`, { title: text, folderId: folderId }))
      .data,
  delete: async (id) => (await api.delete(`${BASE_URL}/${id}`)).data,
};
