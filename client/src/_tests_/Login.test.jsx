import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('jwt-decode', () => ({
    default: vi.fn(() => ({ userId: '123' })),
}));

describe('Login Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('submits login form', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(localStorage.getItem('token')).toBe('mock-token');
        expect(localStorage.getItem('userId')).toBe('123');
    });
});