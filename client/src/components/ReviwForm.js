import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReviewForm.css';

function ReviewForm({ gameId }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/reviews',
        { gameId, rating: Number(rating), comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Review submitted!');
      setRating('');
      setComment('');
    } catch (err) {
      alert('Failed to submit review: ' + (err.response?.data.message || 'Server error'));
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Submit a Review</h3>
      <label htmlFor={`rating-${gameId}`}>Rating (1-5):</label>
      <input
        type="number"
        id={`rating-${gameId}`}
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <label htmlFor={`comment-${gameId}`}>Comment:</label>
      <textarea
        id={`comment-${gameId}`}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;