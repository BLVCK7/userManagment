'use client';

import AddUser from '@/app/component/AddUser';
import Navbar from '@/app/component/Navbar';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + '/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setSession(response.data);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <div>
      <Head>
        <title>User management App</title>
      </Head>
      <Navbar session={session} setSession={setSession} />
      <main>
        {session ? (
          <AddUser />
        ) : (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-bounce">
                Авторизуйтесь для просмотра
              </h1>
              <button
                onClick={() => router.push('/login')}
                className="mt-6 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
                Перейти к авторизации
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
