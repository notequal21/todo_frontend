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
import { Plus } from 'lucide-react';
import { useListsStore } from '@/store/useListsStore';
import { Input } from '../ui/input';
import { useState } from 'react';

const DialogNewList = ({ boardId }) => {
  const { addList } = useListsStore();
  const [title, setTitle] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>
          <Plus className='h-4 w-4' />
          Добавить список
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить новый список</DialogTitle>
        </DialogHeader>
        <Input
          type='text'
          placeholder='Название списка'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Отмена</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant='default'
              onClick={() => {
                addList(title, boardId);
                setTitle('');
              }}
              disabled={!title.trim()}
            >
              Добавить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewList;
