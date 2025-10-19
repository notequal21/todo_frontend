'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useTasksStore } from '@/store/useTasksStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import Task from '@/components/ui/task';
import DialogEditList from './DialogEditList';

const ListCard = ({ list, title }) => {
  const { tasks, loading, fetchTasks, addTask, editTask, deleteTask } =
    useTasksStore();

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
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className='w-full self-start max-w-sm overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm'>
      <div className='flex items-center justify-between p-4'>
        <h2 className='text-xl font-semibold tracking-tight'>
          {title || list?.title}
        </h2>
        <div className='flex items-center gap-2'>
          <DialogEditList list={list} />
        </div>
      </div>
      {/* Форма добавления новой задачи */}
      <form
        className='flex items-center gap-2 border-b border-neutral-200 px-4 pb-4'
        onSubmit={(e) => {
          e.preventDefault();
          if (newTitle.trim()) {
            addTask(newTitle, list?.id || 'general');
          }
          setNewTitle('');
        }}
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder='Новая задача...'
        />

        <Button
          variant='default'
          size='icon'
          type='submit'
          aria-label='Добавить задачу'
          title='Добавить'
          disabled={!newTitle.trim()}
        >
          {!loading && <Plus className='h-4 w-4' />}
          {loading && <Spinner className='size-4 animate-spin' />}
        </Button>
      </form>

      {/* Список задач */}
      <ul className='divide-y divide-neutral-100'>
        {!list &&
          tasks.filter((task) => task.listId === 'general').length === 0 && (
            <li className='p-4 text-sm text-neutral-500'>
              Пока пусто — добавьте задачу
            </li>
          )}
        {tasks.map(
          (task) =>
            task.listId === 'general' &&
            !list && <Task key={task.id} task={task} />
        )}

        {list &&
          (tasks.filter((task) => task.listId === list?.id).length === 0 ? (
            <li className='p-4 text-sm text-neutral-500'>
              Пока пусто — добавьте задачу
            </li>
          ) : (
            tasks.map((task) =>
              list.id === task.listId ? (
                <Task key={task.id} task={task} />
              ) : null
            )
          ))}
      </ul>
    </div>
  );
};

export default ListCard;
