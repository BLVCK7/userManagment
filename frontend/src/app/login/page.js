'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navbar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (error) {
      setError(error.response?.data || 'Login failed');
    }
  };

  const handleYandexLogin = async () => {
    router.push(process.env.NEXT_PUBLIC_API_URL + '/api/auth/yandex/login');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            Login
          </button>
          <button
            type="button"
            onClick={handleYandexLogin}
            className="w-full p-2 bg-red-500 text-white rounded-lg cursor-pointer mt-4">
            Войти с помощью Яндекс
          </button>
          <div className="flex pt-6">
            <span className="block text-gray-700 text-xs font-bold mb-2">
              Если у вас нет логина и пароля, пожалуйста&nbsp;
            </span>
            <span
              onClick={() => router.push('/register')}
              className="block text-gray-700 text-xs font-bold mb-2 cursor-pointer hover:text-gray-400">
              зарегистрируйтесь
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
