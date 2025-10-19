import { api } from './axios';

const BASE_URL = '/tasks';

export const tasksApi = {
  getAll: async () => (await api.get(BASE_URL)).data,
  create: async (text, listId) =>
    (await api.post(BASE_URL, { title: text, listId })).data,
  toggle: async (id, completed) =>
    (await api.put(`${BASE_URL}/toggle/${id}`, { completed })).data,
  update: async (id, text) =>
    (await api.put(`${BASE_URL}/update/${id}`, { title: text })).data,
  delete: async (id) => (await api.delete(`${BASE_URL}/${id}`)).data,
};
