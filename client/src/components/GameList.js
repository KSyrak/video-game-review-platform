import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviwForm';
import '../styles/GameList.css';

function GameList() {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchGames = async (query = '') => {
        try {
            const url = query ? `/api/games/search?q=${encodeURIComponent(query)}` : '/api/games';
            const response = await axios.get(`http://localhost:5000${url}`);
            setGames(response.data);
        } catch (err) {
            console.error('Error fetching games:', err);
            alert('Failed to load games');
        }
    };

    useEffect(() => {
        fetchGames(); // Load seeded games initially
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchGames(searchQuery);
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search games via RAWG API..."
                    className="search-input"
                />
                <button type="submit">Search</button>
            </form>
            <div className="game-list">
                {games.length === 0 ? (
                    <p>No games found.</p>
                ) : (
                    games.map((game) => (
                        <div className="game-card" key={game._id}>
                            <h3>{game.title}</h3>
                            <p>{game.description || 'No description'}</p>
                            <p>By: {game.createdBy.username}</p>
                            <ReviewForm gameId={game._id} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default GameList;