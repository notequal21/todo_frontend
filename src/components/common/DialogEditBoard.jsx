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
import { Pencil, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useBoardsStore } from '@/store/useBoardsStore';

const DialogEditBoard = ({ board }) => {
  const { editBoard, deleteBoard } = useBoardsStore();
  const [title, setTitle] = useState(board?.title || '');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='size-7 ml-auto hidden group-hover/collapsible:flex'
        >
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать доску</DialogTitle>
        </DialogHeader>
        <Input
          type='text'
          placeholder='Название доски'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DialogFooter>
          <div className='flex items-center gap-2 justify-between w-full'>
            <Button variant='destructive' onClick={() => deleteBoard(board.id)}>
              <Trash2 className='h-4 w-4' />
              Удалить доску
            </Button>
            <div className='flex items-center gap-2'>
              <DialogClose asChild>
                <Button variant='outline'>Отмена</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant='default'
                  onClick={() => {
                    editBoard(board.id, title);
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

export default DialogEditBoard;
