import React from 'react';

const User = ({ user, deleteUser, editUser }) => {
  return (
    <>
      <tr key={user.id}>
        <td className="text-left px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{user.username}</div>
        </td>
        <td className="text-left px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{user.email}</div>
        </td>
        <td className="text-left px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {user.yandexId == null ? 'Form Login' : 'OAuth Yandex'}
          </div>
        </td>
        <td className="text-right px-6 py-4 whitespace-nowrap">
          <a
            onClick={(e) => editUser(e, user.id)}
            className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4">
            Edit
          </a>
          <a
            onClick={(e) => deleteUser(e, user.id)}
            className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
            Delete
          </a>
        </td>
      </tr>
    </>
  );
};

export default User;
