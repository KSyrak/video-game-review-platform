import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GameList.css'
import ReviewForm from './ReviwForm';

function GameList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/games');
                setGames(response.data);
            } catch (err) {
                console.error('Error fetching games:', err);
                alert('Failed to load games');
            }
        };
        fetchGames();
    }, []);

    return (
        <div className="game-list">
            {games.map((game) => (
                <div className="game-card" key={game._id}>
                    <h3>{game.title}</h3>
                    <p>{game.description || 'No description'}</p>
                    <p>By: {game.createdBy.username}</p>
                    <button>View Details</button>
                    <ReviewForm gameId={game._id} />
                </div>
            ))}
        </div>
    );
}

export default GameList;