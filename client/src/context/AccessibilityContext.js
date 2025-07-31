import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
    const [fontSize, setFontSize] = useState('normal'); // normal, medium, large
    const [theme, setTheme] = useState('light'); // light, dark

    // Persist settings in localStorage
    useEffect(() => {
        const savedFontSize = localStorage.getItem('fontSize') || 'normal';
        const savedTheme = localStorage.getItem('theme') || 'light';
        setFontSize(savedFontSize);
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('theme', theme);
        document.documentElement.className = `${fontSize}-font ${theme}-theme`;
    }, [fontSize, theme]);

    return (
        <AccessibilityContext.Provider value={{ fontSize, setFontSize, theme, setTheme }}>
            {children}
        </AccessibilityContext.Provider>
    );
}