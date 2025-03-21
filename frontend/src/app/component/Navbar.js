'use client';

import Image from 'next/image';
import React from 'react';
import emptyImage from '../../../public/avatar-default-light.svg';
import { useRouter } from 'next/navigation';

const Navbar = ({ session, setSession }) => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    setSession(null);
    router.push('/login');
  };

  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <p
          onClick={() => router.push('/')}
          className="text-white font-bold flex-auto cursor-pointer">
          User Managment System
        </p>
        {session ? (
          <div className="flex items-center sm:space-x-2 justify-end">
            <Image
              onClick={logout}
              className="rounded-full cursor-pointer"
              src={emptyImage}
              height="30"
              width="30"
              title="Click to Logout"
              alt="Logout"
            />
            <p className="text-white font-bold">{session.username}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center sm:space-x-2 justify-end">
              <span
                onClick={() => router.push('/login')}
                className="rounded-full cursor-pointer text-white">
                Click to Login
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
