import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList'
import RegisterForm from './RegisterForm'

const LoginForm = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async function (e) {
        e.preventDefault();
        await axios.post('https://reqres.in/api/login', {
            email: mail,
            password: password
        }).then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            navigate('/users');
        }).catch(err => {
            console.log(err);
            setError(err.response.data.message);
        })
    }
    return (
        <>
            <div className="container mt-5" style={{ boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)', width: '500px', margin: 'auto', padding: '20px' }}>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit} className="mt-3">
                    

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" onChange={(e) => setMail(e.target.value)} placeholder="Enter email" value={mail} required style={{ width: '100%', maxWidth: '300px' }} />
                    </div>
                    

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter email" value={password} required style={{ width: '100%', maxWidth: '300px' }} />
                    </div>

                    

                    {error && <div className="alert alert-danger">{error}</div>}
                    <p style={{ marginTop: '10px' }}>
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </>
    )
}

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/register" element={<RegisterForm />} />
        </Routes>
    </Router>
);
export default App;

