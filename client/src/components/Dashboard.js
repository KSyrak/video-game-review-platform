import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import AccessibilityControls from './AccessibilityControls';
import '../styles/Dashboard.css';

function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
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

  const handleEdit = (review) => {
    setEditingReview(review._id);
    setRating(review.rating);
    setComment(review.comment || '');
  };

  const handleUpdate = async (e, reviewId) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/reviews/${reviewId}`,
        { rating: Number(rating), comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(reviews.map((r) => (r._id === reviewId ? response.data : r)));
      setEditingReview(null);
      setRating('');
      setComment('');
      alert('Review updated!');
    } catch (err) {
      alert('Failed to update review: ' + (err.response?.data.message || 'Server error'));
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r._id !== reviewId));
      alert('Review deleted!');
    } catch (err) {
      alert('Failed to delete review: ' + (err.response?.data.message || 'Server error'));
    }
  };

  return (
    <div className="dashboard">
      <NavBar />
      <AccessibilityControls />
      <h2>My Reviews</h2>
      <div className="review-list">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <h3>{review.gameId.title}</h3>
              {editingReview === review._id ? (
                <form onSubmit={(e) => handleUpdate(e, review._id)} className="edit-form">
                  <label htmlFor={`rating-${review._id}`}>Rating (1-5):</label>
                  <input
                    type="number"
                    id={`rating-${review._id}`}
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                  <label htmlFor={`comment-${review._id}`}>Comment:</label>
                  <textarea
                    id={`comment-${review._id}`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingReview(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p>Rating: {review.rating}/5</p>
                  <p>{review.comment || 'No comment'}</p>
                  <button onClick={() => handleEdit(review)}>Edit</button>
                  <button onClick={() => handleDelete(review._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;