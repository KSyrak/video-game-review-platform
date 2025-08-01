import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewForm from '../components/ReviewForm';
import { describe, it, expect, beforeEach, vi } from 'vitest';


describe('ReviewForm Component', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('token', 'mock-token');
    });

    it('submits review', async () => {
        render(<ReviewForm gameId="1" />);
        fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'Great game!' } });
        fireEvent.click(screen.getByRole('button', { name: /submit review/i }));
        await waitFor(() => {
            expect(screen.getByLabelText(/rating/i)).toHaveValue('');
            expect(screen.getByLabelText(/comment/i)).toHaveValue('');
        });
    });
});