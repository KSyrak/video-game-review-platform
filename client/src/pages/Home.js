import React from 'react';
import GameList from '../components/GameList';

function Home() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Video Game Reviews</h1>
            <GameList />
        </div>
    );
}

export default Home;