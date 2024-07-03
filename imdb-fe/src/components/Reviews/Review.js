import React, { useState, useEffect } from 'react';
import './Review.css';

const MovieReview = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    movieName: '',
    userName: '',
    description: '',
    rating: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  // Fetch reviews from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/api/review')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the new review to the backend
    fetch('http://localhost:8080/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(addedReview => {
        setReviews([...reviews, addedReview]);
        setNewReview({
          movieName: '',
          userName: '',
          description: '',
          rating: ''
        });
        // Show the popup
        setShowPopup(true);
        // Hide the popup after 3 seconds
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch(error => console.error('Error adding review:', error));
  };

  const handleDelete = (id) => {
    // Send the delete request to the backend
    fetch(`http://localhost:8080/api/review/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          setReviews(reviews.filter(review => review.id !== id));
        } else {
          throw new Error('Failed to delete review');
        }
      })
      .catch(error => console.error('Error deleting review:', error));
  };

  return (
    <div className="movie-review">
      <h2>Movie Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <h3>{review.movieName}</h3>
          <p><strong>Reviewed by:</strong> {review.userName}</p>
          <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {review.description}</p>
          <p><strong>Rating:</strong> {review.rating} / 5</p>
          <button onClick={() => handleDelete(review.id)}>Delete</button>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="review-form">
        <h3>Add a Review</h3>
        <label>
          Movie Name:
          <input 
            type="text" 
            name="movieName" 
            value={newReview.movieName} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Your Name:
          <input 
            type="text" 
            name="userName" 
            value={newReview.userName} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Description:
          <textarea 
            name="description" 
            value={newReview.description} 
            onChange={handleChange} 
            required 
          ></textarea>
        </label>
        <label>
          Rating:
          <input 
            type="number" 
            name="rating" 
            value={newReview.rating} 
            onChange={handleChange} 
            step="0.1" 
            min="0" 
            max="5" 
            required 
          />
        </label>
        <button type="submit">Add Review</button>
      </form>
      {showPopup && <div className="popup">Review added!</div>}
    </div>
  );
};

export default MovieReview;
