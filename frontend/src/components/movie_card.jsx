import React, { useEffect, useState } from 'react';

const MovieCard = ({ details }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    setMovieDetails(details);
    console.log('MovieCard Details:', details);
  }, [details]);

  if (!movieDetails || !movieDetails.results || !movieDetails.results.id) {
    return <div>Loading movie details...</div>;
  }

  const { results } = movieDetails;

  if (!results) {
    return <div>Movie details not available</div>;
  }

  const imdbUrl = `https://www.imdb.com/title/${results.id}/`;

  return (
    <div className="movie-card" key={results.id}>
      <a href={imdbUrl} target='_blank' rel='noopener noreferrer'>
        <img width="150" src={results.primaryImage.url} alt={`${results.originalTitleText.text} poster`} />
      </a>
      <h3>{results.originalTitleText.text}</h3>
    </div>
  );
};

export default MovieCard;
