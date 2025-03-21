'use client';

import { React, useEffect, useState } from 'react';

import EditUser from './EditUser';
import api from '../utils/api';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);

  const deleteUser = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/api/users/${id}`);
    } catch (error) {
      console.error('Error updating data: ', error);
    } finally {
      if (users) {
        setUsers((prev) => {
          return prev.filter((user) => user.id != id);
        });
      }
    }
  };

  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Username
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Email
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Login Type
                </th>
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {users.map((user) => (
                  <User user={user} key={user.id} deleteUser={deleteUser} editUser={editUser} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditUser userId={userId} setResponseUser={setResponseUser} />
    </>
  );
};

export default UserList;
