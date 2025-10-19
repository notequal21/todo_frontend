import { Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTasksStore } from '@/store/useTasksStore';
import { useState } from 'react';

export default function Task({ task, id }) {
  const { loading, fetchTasks, editTask, deleteTask, toggleTask } =
    useTasksStore();

  // Состояние для ввода новой задачи
  const [newTitle, setNewTitle] = useState('');

  // Состояние редактирования конкретной задачи
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

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

  return (
    <li key={task.id} className='group flex items-center gap-3 p-3'>
      {/* Переключатель выполнено/не выполнено */}
      <button
        onClick={() => toggleTask(task.id, task.completed)}
        aria-pressed={task.completed}
        className='inline-flex h-6 w-6 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-50'
        title={task.completed ? 'Сделано' : 'Не сделано'}
      >
        {task.completed ? (
          <CheckCircle2 className='h-5 w-5 text-green-600' />
        ) : (
          <Circle className='h-5 w-5' />
        )}
      </button>

      {/* Название или поле редактирования */}
      {editingId === task.id ? (
        <input
          autoFocus
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          className='flex-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-sm outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200'
        />
      ) : (
        <span
          className={
            'flex-1 select-none text-sm' +
            (task.completed
              ? ' line-through text-neutral-400'
              : ' text-neutral-800')
          }
        >
          {task.title}
        </span>
      )}

      {/* Действия над задачей */}
      {editingId === task.id ? null : (
        <div className='ml-auto flex items-center gap-1'>
          {!task.completed && (
            <Button
              onClick={() => startEdit(task)}
              aria-label='Редактировать'
              title='Редактировать'
              variant='ghost'
              size='icon'
            >
              <Pencil className='h-4 w-4' />
            </Button>
          )}
          <Button
            onClick={() => deleteTask(task.id)}
            aria-label='Удалить'
            title='Удалить'
            variant='ghost'
            size='icon'
            className='text-red-600'
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      )}
    </li>
  );
}
