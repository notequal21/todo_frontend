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
import { useFoldersStore } from '@/store/useFoldersStore';
const DialogEditFolder = ({ folder }) => {
  const { editFolder, deleteFolder } = useFoldersStore();
  const [title, setTitle] = useState(folder?.title || '');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='size-7 hidden group-hover/collapsible:flex'
        >
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать папку</DialogTitle>
        </DialogHeader>
        <Input
          type='text'
          placeholder='Название папки'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DialogFooter>
          <div className='flex items-center gap-2 justify-between w-full'>
            <Button
              variant='destructive'
              onClick={() => deleteFolder(folder.id)}
            >
              <Trash2 className='h-4 w-4' />
              Удалить папку
            </Button>
            <div className='flex items-center gap-2'>
              <DialogClose asChild>
                <Button variant='outline'>Отмена</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant='default'
                  onClick={() => {
                    editFolder(folder.id, title);
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

export default DialogEditFolder;
