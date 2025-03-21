'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const EditUser = ({ userId, setResponseUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    yandexId: '',
  });

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/api/users/${userId}`, user);
      setResponseUser(res.data);
      reset(e);
    } catch (error) {
      console.error('Error updating data: ', error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/users/${userId}`);
        setUser(res.data);
        setIsOpen(true);
      } catch (error) {
        console.error(`Error fetching data user with id ${userId}: `, error);
      }
    };

    userId && fetchData();
  }, [userId]);

  const reset = (e) => {
    e.preventDefault();
    setIsOpen(false);
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
                Update User
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
                      disabled="on"
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
                      onClick={updateUser}>
                      Update
                    </button>
                    <button
                      className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                      onClick={reset}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditUser;
