import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccessibilityControls from './AccessibilityControls';
import '../styles/Dashboard.css';

function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/reviews/my-reviews', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        alert('Failed to load reviews');
        navigate('/login');
      }
    };
    fetchReviews();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <AccessibilityControls />
      <h2>My Reviews</h2>
      <div className="review-list">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <h3>{review.gameId.title}</h3>
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment || 'No comment'}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;