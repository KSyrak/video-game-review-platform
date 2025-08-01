import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityContext } from '../context/AccessibilityContext';
import AccessibilityControls from '../components/AccessibilityControls';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AccessibilityControls Component', () => {
    const mockContext = {
        fontSize: 'normal',
        setFontSize: vi.fn(),
        theme: 'light',
        setTheme: vi.fn(),
    };

    it('toggles font size', () => {
        render(
            <AccessibilityContext.Provider value={mockContext}>
                <AccessibilityControls />
            </AccessibilityContext.Provider>
        );
        const fontButton = screen.getByText(/font size: normal/i);
        fireEvent.click(fontButton);
        expect(mockContext.setFontSize).toHaveBeenCalledWith('medium');
    });

    it('toggles theme', () => {
        render(
            <AccessibilityContext.Provider value={mockContext}>
                <AccessibilityControls />
            </AccessibilityContext.Provider>
        );
        const themeButton = screen.getByText(/theme: dark/i);
        fireEvent.click(themeButton);
        expect(mockContext.setTheme).toHaveBeenCalledWith('dark');
    });
});