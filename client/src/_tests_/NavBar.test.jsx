import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { describe, it, expect, beforeEach, vi } from 'vitest';


describe('NavBar Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('shows login/register when logged out', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    it('shows dashboard/logout when logged in', () => {
        localStorage.setItem('token', 'mock-token');
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('handles logout', () => {
        localStorage.setItem('token', 'mock-token');
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));
        expect(localStorage.getItem('token')).toBeNull();
    });
});