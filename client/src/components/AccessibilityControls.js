import React, { useContext } from 'react';
import { AccessibilityContext } from '../context/AccessibilityContext';
import '../styles/AccessibilityControls.css';

function AccessibilityControls() {
    const { fontSize, setFontSize, theme, setTheme } = useContext(AccessibilityContext);

    const toggleFontSize = () => {
        const sizes = ['normal', 'medium', 'large'];
        const currentIndex = sizes.indexOf(fontSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        setFontSize(sizes[nextIndex]);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="accessibility-controls">
            <button onClick={toggleFontSize}>
                Font Size: {fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}
            </button>
            <button onClick={toggleTheme}>
                Theme: {theme === 'light' ? 'Dark' : 'Light'}
            </button>
        </div>
    );
}

export default AccessibilityControls;