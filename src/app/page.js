'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useTasksStore } from '@/store/useTasksStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import Task from '@/components/ui/task';
import ListCard from '@/components/common/ListCard';
import { useListsStore } from '@/store/useListsStore';
import DialogNewList from '@/components/common/DialogNewList';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

// Простой список задач: добавление, удаление, отметка выполнения и редактирование
export default function Home() {
  const { tasks, loading, fetchTasks, addTask, editTask, deleteTask } =
    useTasksStore();
  const { lists, loadingLists, fetchLists, addList, editList, deleteList } =
    useListsStore();

  // Состояние для ввода новой задачи
  const [newTitle, setNewTitle] = useState('');
  // Состояние редактирования конкретной задачи
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Переключение статуса выполнения
  const toggleTask = (id, completed) => {
    editTask(id, null, !completed);
  };

  // Начало редактирования задачи
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  // Сохранение изменений названия задачи
  const saveEdit = () => {
    const title = editingTitle.trim();
    if (!title) {
      // Пустое название не сохраняем
      setEditingId(null);
      setEditingTitle('');
      return;
    }
    editTask(editingId, title);
    setEditingId(null);
    setEditingTitle('');
  };

  // Отмена редактирования
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <main className='min-h-dvh bg-gradient-to-b from-white to-neutral-50'>
      <div className='px-4 py-10'>
        <div className='flex items-center justify-between'>
          <h1 className='mb-6 text-3xl font-semibold tracking-tight'>Задачи</h1>

          {/* <Button variant='default' onClick={() => addList('Новый список')}>
            <Plus className='h-4 w-4' />
            Добавить список
          </Button> */}
          <DialogNewList />
        </div>

        <div className='flex flex-wrap gap-4'>
          <ListCard title='Общий список' />
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      </div>
    </main>
  );
}
