import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReviewForm.css';

function ReviewForm({ gameId }) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/reviews', {
                gameId,
                rating: Number(rating),
                comment,
            });
            alert('Review submitted!');
            setRating('');
            setComment('');
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review');
        }
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <label htmlFor="rating">Rating (1-5):</label>
            <input
                type="number"
                id="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
            />
            <label htmlFor="comment">Comment:</label>
            <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
            />
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;