import React, { useEffect, useState } from "react";
import axios from "axios";

const TableThree = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/getAllUsers')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  
  const getRandomProfileImage = () => {
    return `https://picsum.photos/seed/${Math.random()}/50/50`;
  };

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:5000/api/user/${userId}`)
      .then(() => setUsers(users.filter(user => user.id !== userId)))
      .catch((error) => console.log(error));
  };

  const handleRoleSwitch = (userId) => {
    axios.post(`http://localhost:5000/api/user/switchRole/${userId}`)
      .then((response) => setUsers(users.map(user => user.id === userId ? response.data : user)))
      .catch((error) => console.log(error));
  };

  const handleMakeAdmin = (userId) => {
    axios.post(`http://localhost:5000/api/user/makeAdmin/${userId}`)
      .then((response) => setUsers(users.map(user => user.id === userId ? response.data : user)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <h4 className="text-xl font-semibold text-black dark:text-white">
          All Users
        </h4>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <div className="flex items-center space-x-3">
                    <img
                      src={getRandomProfileImage()}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {user.firstName} {user.lastName}
                      </h5>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      user.status === "Active"
                        ? "bg-success text-success"
                        : "bg-warning text-warning"
                    }`}
                  >
                    {user.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleRoleSwitch(user.id)}
                    >
                      Switch Role
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleMakeAdmin(user.id)}
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
