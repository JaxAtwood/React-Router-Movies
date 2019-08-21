import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const MovieCard = props => {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);

  const MovieList = props => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
      const getMovies = () => {
        axios
          .get('http://localhost:5000/api/movies')
          .then(response => {
            setMovies(response.data);
          })
          .catch(error => {
            console.error('Server Error', error);
          });
      }
      
      getMovies();
    }, []);

    return (
      <div className="movie-list">
        {movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }

    useEffect(() => {
      const id = props.match.params.id;
      // change ^^^ that line and grab the id from the URL
      // You will NEED to add a dependency array to this effect hook
  
         axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(response => {
            setMovie(response.data);
          })
          .catch(error => {
            console.error(error);
          });
  
    },[props.match.params.id]);

    if (!movie) {
      return <div>Loading movie information...</div>;
    }

    function MovieDetails({ movie }) {
      const { title, director, metascore, stars } = movie;
      return (
        <Link to= {`/movie/${movie.id}`}>
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>
    
          {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
        </div>
        </Link>
      );
    }
  // return;
};

export {MovieList, MovieCard};
