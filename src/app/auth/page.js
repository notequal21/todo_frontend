'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authApi } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthPage() {
  const router = useRouter();
  const formSignIn = useForm({
    resolver: zodResolver(
      z.object({
        username: z.string().min(3).optional(),
        password: z.string().min(4).optional(),
      })
    ),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const formSignUp = useForm({
    resolver: zodResolver(
      z.object({
        username: z.string().min(3).optional(),
        password: z.string().min(4).optional(),
      })
    ),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmitSignIn = async (data) => {
    const response = await authApi.login(data.username, data.password);
    console.log(response);

    if (response.success) {
      localStorage.setItem('token', `${response.token}`);
      router.push('/board');
      // toast.success('Вход успешен');
    } else {
      // toast.error(response.data.message);
    }
  };

  const onSubmitSignUp = async (data) => {
    const response = await authApi.register(data.username, data.password);
    console.log(response);
    if (response.success) {
      localStorage.setItem('token', `${response.token}`);
      router.push('/board');
      // toast.success('Регистрация успешна');
    } else {
      // toast.error(response.data.message);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      router.push('/board');
    }
  }, [router]);

  return (
    <main className='min-h-dvh bg-gradient-to-b from-white to-neutral-50'>
      <div className='px-4 py-10 flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='mb-6 text-3xl text-center font-semibold tracking-tight'>
            Авторизация
          </h1>
        </div>

        <Tabs defaultValue='signin' className='w-[400px]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='signin'>Войти</TabsTrigger>
            <TabsTrigger value='signup'>Зарегистрироваться</TabsTrigger>
          </TabsList>
          <TabsContent value='signin'>
            <Form {...formSignIn}>
              <form
                className='space-y-4'
                onSubmit={formSignIn.handleSubmit(onSubmitSignIn)}
              >
                <FormField
                  control={formSignIn.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Логин</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='Логин' {...field} />
                      </FormControl>
                      <FormMessage>
                        {formSignIn.formState.errors.username?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formSignIn.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Пароль'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {formSignIn.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full'>
                  Войти
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value='signup'>
            <Form {...formSignUp}>
              <form
                className='space-y-4'
                onSubmit={formSignUp.handleSubmit(onSubmitSignUp)}
              >
                <FormField
                  control={formSignUp.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Логин</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder='Логин' {...field} />
                      </FormControl>
                      <FormMessage>
                        {formSignUp.formState.errors.username?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formSignUp.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Пароль'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {formSignUp.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full'>
                  Зарегистрироваться
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
