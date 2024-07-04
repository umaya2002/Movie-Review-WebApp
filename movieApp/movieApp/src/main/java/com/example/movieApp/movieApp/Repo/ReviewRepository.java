package com.example.movieApp.movieApp.Repo;

import com.example.movieApp.movieApp.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMovieName(String movieName);

}
