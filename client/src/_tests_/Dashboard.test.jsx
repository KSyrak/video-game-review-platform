import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityContext } from '../context/AccessibilityContext';
import Dashboard from '../components/Dashboard';
import { describe, it, expect, beforeEach, vi } from 'vitest';


describe('Dashboard Component', () => {
    const mockContext = {
        fontSize: 'normal',
        setFontSize: vi.fn(),
        theme: 'light',
        setTheme: vi.fn(),
    };

    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('token', 'mock-token');
    });

    it('renders reviews', async () => {
        render(
            <BrowserRouter>
                <AccessibilityContext.Provider value={mockContext}>
                    <Dashboard />
                </AccessibilityContext.Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Elden Ring')).toBeInTheDocument();
            expect(screen.getByText('Rating: 4/5')).toBeInTheDocument();
        });
    });

    it('toggles edit form and updates review', async () => {
        render(
            <BrowserRouter>
                <AccessibilityContext.Provider value={mockContext}>
                    <Dashboard />
                </AccessibilityContext.Provider>
            </BrowserRouter>
        );
        await waitFor(() => screen.getByText('Elden Ring'));
        fireEvent.click(screen.getByRole('button', { name: /edit/i }));
        fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '5' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));
        await waitFor(() => {
            expect(screen.getByText('Rating: 5/5')).toBeInTheDocument();
        });
    });

    it('deletes review', async () => {
        window.confirm = vi.fn(() => true);
        render(
            <BrowserRouter>
                <AccessibilityContext.Provider value={mockContext}>
                    <Dashboard />
                </AccessibilityContext.Provider>
            </BrowserRouter>
        );
        await waitFor(() => screen.getByText('Elden Ring'));
        fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        await waitFor(() => {
            expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
        });
    });
});