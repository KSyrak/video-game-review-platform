import React from 'react';
import GameList from '../components/GameList';
import NavBar from '../components/NavBar';
import AccessibilityControls from '../components/AccessibilityControls';

function Home() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <NavBar />
            <AccessibilityControls />
            <h1>Video Game Reviews</h1>
            <GameList />
        </div>
    );
}

export default Home;