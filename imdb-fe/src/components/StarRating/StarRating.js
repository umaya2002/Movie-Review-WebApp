import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => { //on rating and after the change
  const handleClick = (index) => {
    onRatingChange(index + 1);  // after click the star it updates the rating
  };

  return (
    <div className="star-rating" role="radiogroup" aria-label="Star Rating"> 
      {[...Array(5)].map((star, index) => (
        <span 
          key={index}  //provide unique key for each elements
          className={index < rating ? 'star filled' : 'star'} //it he not rates it stayed as it was
          onClick={() => handleClick(index)} //when it clicked
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(index);
            }
          }}
          role="radio" //elements are radio buttons
          aria-checked={index < rating}
          tabIndex="0"
        >
          ★ 
        </span> 
      ))}
    </div>
  );
};

export default StarRating;
