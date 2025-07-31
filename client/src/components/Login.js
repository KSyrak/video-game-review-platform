import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import NavBar from './NavBar';
import AccessibilityControls from './AccessibilityControls';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            localStorage.setItem('userId', decoded.userId);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed: ' + (err.response?.data.message || 'Server error'));
        }
    };

    return (
        <div>
            <NavBar />
            <AccessibilityControls />
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
}

export default Login;