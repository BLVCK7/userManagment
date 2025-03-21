'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function YandexCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleYandexCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          return console.error('Code is missing in URL');
        }

        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + '/api/auth/yandex/callback',
          { params: { code: code } },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          router.push('/');
        } else {
          throw new Error('Token not received');
        }
      } catch (error) {
        console.error('Error during Yandex OAuth callback:', error);
        setError(error.message || 'An error occurred');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    handleYandexCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
}
