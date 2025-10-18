import { api } from './axios';

export const tasksApi = {
  getAll: async () => (await api.get('/')).data,
  create: async (text) => (await api.post('/', { title: text })).data,
  update: async (id, text, completed) => {
    return (
      await api.put(`/${id}`, {
        title: text,
        completed: completed,
      })
    ).data;
  },
  delete: async (id) => (await api.delete(`/${id}`)).data,
};
