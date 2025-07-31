import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    useEffect(() => {
        const checkToken = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };
        checkToken();
        window.addEventListener('storage', checkToken);
        return () => window.removeEventListener('storage', checkToken);
    }, []);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <button onClick={handleLogout} className="nav-button">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;