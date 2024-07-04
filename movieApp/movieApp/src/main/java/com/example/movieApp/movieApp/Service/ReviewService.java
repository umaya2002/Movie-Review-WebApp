package com.example.movieApp.movieApp.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getReviewsByMovieName(String movieName) {
        return reviewRepository.findByMovieName(movieName);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        Optional<Review> reviewOptional = reviewRepository.findById(id);
        if (reviewOptional.isPresent()) {
            return reviewOptional.get();
        } else {
            throw new IllegalStateException("Review with id " + id + " not found");
        }
    }

    public void addNewReview(Review review) {
        review.setDate(new Date());
        reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        boolean exists = reviewRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Review with id " + id + " does not exist");
        }
        reviewRepository.deleteById(id);
    }

    public void updateReview(Long id, Review updatedReview) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Review with id " + id + " does not exist"));

        // Update title if not null
        String movieName = updatedReview.getMovieName();
        if (movieName != null) {
            existingReview.setMovieName(movieName);
        }

        Date date = updatedReview.getDate();
        if(date != null){
            existingReview.setDate(date);
        }

        // Update content if not null
        String content = updatedReview.getDescription();
        if (content != null) {
            existingReview.setDescription(content);
        }

        // Update rating if not null
        Double rating = updatedReview.getRating();
        if (rating != null) {
            existingReview.setRating(rating);
        }

        reviewRepository.save(existingReview);
    }
}
