'use client';

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useState } from 'react';
import UserList from './UserList';

const AddUser = () => {
  const USER_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api/users';

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
  });
  const [responseUser, setResponseUser] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
  });

  function open() {
    setIsOpen(true);
  }

  const close = (e) => {
    setUser({
      id: '',
      username: '',
      password: '',
      email: '',
    });
    setIsOpen(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const res = await fetch(USER_API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res) {
      throw new Error('Something went wrong');
    }
    const _user = await res.json();
    setResponseUser(_user);
    close(e);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={setIsOpen}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-lg bg-gray-100">
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Add New User
              </DialogTitle>
              <div className="flex max-w-md mx-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                      className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                      className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                      className="h-10 w-96 border mt-2 px-2 py-2"
                    />
                  </div>
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                      onClick={(e) => saveUser(e)}>
                      Save
                    </button>
                    <button
                      className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                      onClick={(e) => close(e)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <UserList user={responseUser} />
    </>
  );
};

export default AddUser;
