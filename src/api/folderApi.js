import { api } from './axios';

const BASE_URL = '/folders';

export const folderApi = {
  getAll: async () => (await api.get(BASE_URL)).data,
  create: async (text) => (await api.post(BASE_URL, { title: text })).data,
  update: async (id, text) =>
    (await api.put(`${BASE_URL}/${id}`, { title: text })).data,
  delete: async (id) => (await api.delete(`${BASE_URL}/${id}`)).data,
};
