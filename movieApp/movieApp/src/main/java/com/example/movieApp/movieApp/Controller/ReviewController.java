package com.example.movieApp.movieApp.Controller;

import com.example.movieApp.movieApp.review.Review;
import com.example.movieApp.movieApp.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/review")
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @PostMapping
    public void addNewReview(@RequestBody Review review) {
        reviewService.addNewReview(review);
    }

    @GetMapping("/movie")
    public List<Review> getReviewsByMovieName(@RequestBody String movieName) {
        System.out.println(movieName);
        return reviewService.getReviewsByMovieName(movieName);
    }

    @DeleteMapping(path = "{id}")
    public void deleteReview(@PathVariable("id") Long id) {
        reviewService.deleteReview(id);
    }

    @PutMapping(path = "{id}")
    public void updateReview(@PathVariable("id") Long id, @RequestBody Review updatedReview) {
        reviewService.updateReview(id, updatedReview);
    }
}
