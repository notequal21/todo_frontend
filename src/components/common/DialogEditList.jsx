import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useListsStore } from '@/store/useListsStore';
import { Input } from '../ui/input';
import { useState } from 'react';

const DialogEditList = ({ list }) => {
  const { editList, deleteList } = useListsStore();
  const [title, setTitle] = useState(list?.title || '');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать список</DialogTitle>
        </DialogHeader>
        <Input
          type='text'
          placeholder='Название списка'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DialogFooter>
          <div className='flex items-center gap-2 justify-between w-full'>
            <Button variant='destructive' onClick={() => deleteList(list.id)}>
              <Trash2 className='h-4 w-4' />
              Удалить список
            </Button>
            <div className='flex items-center gap-2'>
              <DialogClose asChild>
                <Button variant='outline'>Отмена</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant='default'
                  onClick={() => {
                    editList(list.id, title);
                  }}
                  disabled={!title.trim()}
                >
                  Сохранить
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditList;
