import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GameList from '../components/GameList';
import { describe, it, expect, beforeEach, vi } from 'vitest';


describe('GameList Component', () => {
    it('renders search bar and games', async () => {
        render(<GameList />);
        expect(screen.getByPlaceholderText(/search games/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Elden Ring')).toBeInTheDocument();
        });
    });

    it('handles search', async () => {
        render(<GameList />);
        fireEvent.change(screen.getByPlaceholderText(/search games/i), { target: { value: 'Zelda' } });
        fireEvent.click(screen.getByRole('button', { name: /search/i }));
        await waitFor(() => {
            expect(screen.getByText('Zelda')).toBeInTheDocument();
        });
    });
});