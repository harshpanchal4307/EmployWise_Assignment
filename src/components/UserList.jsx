import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUser from './EditUser';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      debugger
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=1`);
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in//api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setStatusMessage('User deleted successfully');
    } catch (error) {
      setStatusMessage('Failed to delete user');
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      {statusMessage && <div className="alert alert-info">{statusMessage}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map?.(user => (
            <tr key={user.id}>
              <td><img src={user.avatar} alt={user.first_name} width="50" /></td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEditClick(user)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {editUser && <EditUser user={editUser} onClose={() => setEditUser(null)} />}
    </div>
  );
};

export default UserList;

