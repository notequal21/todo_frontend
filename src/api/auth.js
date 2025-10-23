import { api } from './axios';

const BASE_URL = '/user';

export const authApi = {
  login: async (username, password) =>
    (await api.post(`${BASE_URL}/login`, { username, password })).data,
  register: async (username, password) =>
    (await api.post(`${BASE_URL}/register`, { username, password })).data,
  get: async () => (await api.get(`${BASE_URL}/me`)).data,
};
