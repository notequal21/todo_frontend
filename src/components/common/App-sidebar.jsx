'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight, Edit, File, Folder, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useFoldersStore } from '@/store/useFoldersStore';
import { useBoardsStore } from '@/store/useBoardsStore';
import { Spinner } from '../ui/spinner';
import DialogEditFolder from './DialogEditFolder';
import DialogEditBoard from './DialogEditBoard';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NavUser } from '../ui/nav-user';
import { useUserStore } from '@/store/useUserStore';

// const data = {
//   // tree: [
//   //   [
//   //     'app',
//   //     [
//   //       'api',
//   //       ['hello', ['route.ts']],
//   //       ['page', []],
//   //       'layout.tsx',
//   //       ['blog', ['page.tsx']],
//   //     ],
//   //   ],
//   // ],
//   tree: [
//     {
//       title: 'app',
//       id: '1',
//       type: 'folder',
//       children: [
//         {
//           title: 'api',
//           id: '2',
//           type: 'folder',
//           children: [
//             { title: 'hello', id: '3', type: 'board' },
//             { title: 'page', id: '4', type: 'board' },
//             { title: 'layout.tsx', id: '5', type: 'board' },
//             { title: 'blog', id: '6', type: 'board' },
//           ],
//         },
//         { title: 'page', id: '4', type: 'board' },
//       ],
//     },
//   ],
// };

export function AppSidebar({ ...props }) {
  const [data, setData] = useState({ tree: [] });

  const {
    folders,
    loadingFolders,
    fetchFolders,
    addFolder,
    editFolder,
    deleteFolder,
  } = useFoldersStore();
  const {
    boards,
    loadingBoards,
    fetchBoards,
    addBoard,
    editBoard,
    deleteBoard,
  } = useBoardsStore();
  const { user, loadingUser, fetchUser } = useUserStore();

  useEffect(() => {
    fetchFolders();
    fetchBoards();
  }, [fetchFolders, fetchBoards]);

  useEffect(() => {
    setData({
      tree: folders.map((folder) => ({
        title: folder.title,
        id: folder.id,
        type: 'folder',
        children: boards
          .filter((board) => board.folderId === folder.id)
          .map((board) => ({
            title: board.title,
            id: board.id,
            type: 'board',
          })),
      })),
    });
  }, [folders, boards]);

  useEffect(() => {
    fetchUser();
    console.log(user);
  }, [fetchUser]);

  return (
    <Sidebar {...props}>
      <SidebarHeader className='border-sidebar-border h-16 border-b'>
        <NavUser
          user={{
            name: user?.username || 'Unknown',
            email: user?.email || 'Unknown',
            avatar: user?.avatar || '/avatars/shadcn.jpg',
          }}
        />
      </SidebarHeader>
      <SidebarHeader className='text-2xl font-bold'>Task Manager</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='flex items-center gap-2 pb-2'>
            Доски
            {/* <Button variant='outline' size='icon' className='size-7 ml-auto'>
              <File className='h-4 w-4' />
            </Button> */}
            <Button
              variant='outline'
              size='icon'
              className='size-7 ml-auto'
              onClick={() => {
                addFolder('Новая папка');
              }}
              disabled={loadingFolders}
            >
              {loadingFolders ? (
                <Spinner className='size-4 animate-spin' />
              ) : (
                <Folder className='h-4 w-4' />
              )}
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='text-sm text-gray-500'>
        <p>v0.3.0 - 2025.10.23</p>
      </SidebarFooter>
    </Sidebar>
  );
}

function Tree({ item }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const {
    folders,
    loadingFolders,
    fetchFolders,
    addFolder,
    editFolder,
    deleteFolder,
  } = useFoldersStore();
  const {
    boards,
    loadingBoards,
    fetchBoards,
    addBoard,
    editBoard,
    deleteBoard,
  } = useBoardsStore();
  const { id: boardId } = useParams();

  // if (item.type === 'folder' && item.children.length < 1)
  //   return <div className='text-sm text-gray-500'>Пусто</div>;

  if (item.type === 'board') {
    return (
      <SidebarMenuButton
        asChild
        isActive={String(item.id) === String(boardId)}
        // isActive={name === 'button.tsx'}
        className='data-[active=true]:bg-transparent'
      >
        <Link href={`/board/${item.id}`}>
          <File />
          {item.title}
          <DialogEditBoard board={item} />
        </Link>
        {/* <Button
          variant='outline'
          size='icon'
          className='size-7 ml-auto hidden group-hover/collapsible:flex'
        >
          <Edit className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          className='size-7 hidden group-hover/collapsible:flex'
          onClick={() => {
            deleteBoard(item.id);
          }}
          disabled={loadingBoards}
        >
          {loadingBoards ? (
            <Spinner className='size-4 animate-spin' />
          ) : (
            <Trash className='h-4 w-4 text-red-500' />
          )}
        </Button> */}
      </SidebarMenuButton>
    );
  }
  return (
    <SidebarMenuItem>
      <Collapsible
        className='group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90'
        // defaultOpen={name === 'components' || name === 'ui'}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className='transition-transform' />
            <Folder />
            {item.title}

            <Button
              variant='outline'
              size='icon'
              className='size-7 ml-auto hidden group-hover/collapsible:flex'
              onClick={() => {
                addBoard('Новая доска', item.id);
              }}
              disabled={loadingBoards}
            >
              {loadingBoards ? (
                <Spinner className='size-4 animate-spin' />
              ) : (
                <File className='h-4 w-4' />
              )}
            </Button>
            <DialogEditFolder folder={item} />
            {/* <Button
              variant='outline'
              size='icon'
              className='size-7 hidden group-hover/collapsible:flex'
            >
              <Edit className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='size-7 hidden group-hover/collapsible:flex'
              onClick={() => {
                deleteFolder(item.id);
              }}
              disabled={loadingFolders}
            >
              {loadingFolders ? (
                <Spinner className='size-4 animate-spin' />
              ) : (
                <Trash className='h-4 w-4 text-red-500' />
              )}
            </Button> */}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
            {item.type === 'folder' && item.children.length < 1 && (
              <div className='text-sm text-gray-500'>Пусто</div>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
