import { create } from 'zustand';
import { tasksApi } from '@/api/tasksApi';

export const useTasksStore = create((set, get) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    const data = await tasksApi.getAll();
    set({ tasks: data, loading: false });
  },

  addTask: async (text) => {
    set({ loading: true });
    const newTask = await tasksApi.create(text);
    set({ tasks: [...get().tasks, newTask] });
    set({ loading: false });
  },

  editTask: async (id, text, completed) => {
    set({ loading: true });
    const updated = await tasksApi.update(id, text, completed);
    set({
      tasks: get().tasks.map((t) => (t.id === id ? updated : t)),
    });
    set({ loading: false });
  },

  deleteTask: async (id) => {
    set({ loading: true });
    await tasksApi.delete(id);
    set({
      tasks: get().tasks.filter((t) => t.id !== id),
    });
    set({ loading: false });
  },
}));
