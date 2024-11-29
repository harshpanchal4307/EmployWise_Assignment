import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });
debugger
export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
export const fetchUsers = (page) => API.get(`/users`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
