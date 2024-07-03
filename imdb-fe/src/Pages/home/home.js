import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/review",{
                    method:"GET"
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        }
        
        fetchReviews();
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results)) 
            .catch(err => console.error("Failed to fetch movies", err));
    }, []);

    return (
        <div className="poster">
            <div className="navigationLinks">
               
            </div>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {popularMovies.map(movie => (
                    <Link key={movie.id} style={{textDecoration:"none",color:"white"}} to={`/update-movie/${movie.id}`}>
                        <div className="posterImage">
                            <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title}/>
                        </div>
                        <div className="posterImage_overlay">
                            <div className="posterImage_title">{movie ? movie.original_title: ""}</div>
                            <div className="posterImage_runtime">
                                {movie ? movie.release_date : ""} 
                                <span className="posterImage_rating">
                                    {movie ? movie.vote_average : ""}
                                    <i className="fas fa-star" />{" "}
                                </span>
                            </div>
                            <div className="posterImage_description">{movie ? movie.overview : ""}</div>
                        </div>
                    </Link>
                ))}
            </Carousel>
            <MovieList />
        </div>
    );
}

export default Home;
