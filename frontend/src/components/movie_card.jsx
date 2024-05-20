import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../api';

const MovieCard = ({ imdbId, details }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    
  setMovieDetails(details)  
 
  
  }, [imdbId , details]);



  const imdbUrl = `https://www.imdb.com/title/${movieDetails?.results?.id}/`;
  console.log(imdbId);
  return (
    <div className="movie-card" key={imdbId}>
      <a href={imdbUrl} target='_blank' rel='noopener noreferrer'>
        <img width="150" src={movieDetails?.results?.primaryImage?.url} alt={`${movieDetails?.results?.title} poster`} />
      </a>
      <h3>{movieDetails?.results?.originalTitleText.text}</h3>
      
    </div>
  );
};

export default MovieCard;
