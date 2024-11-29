import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList'
const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(' https://reqres.in/api/register', {
      firstName,
      lastName,
      email,
      password,
    }).then(res => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/users';
    }).catch(err => {
      console.log(err);
      setError(err.response.data.message);
    })
  };

  return (
    <div className="container mt-5" style={{ boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)', width: '500px', margin: 'auto', padding: '20px' }}>
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" value={firstName} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" value={lastName} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" value={email} required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" value={password} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mt-3 p-4 m-4" style={{ marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary w-100">Register</button>
          <p className="text-center mt-3">Have an account? <a href="/">Login</a></p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm;



