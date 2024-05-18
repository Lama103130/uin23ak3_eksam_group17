
import React from 'react';

const MovieCard = ({ movie }) => {
  if (!movie || !movie.imdb_id) {
    return <div>Mangler filmdata</div>;
  }

  return (
    <div className='movie_card'>
      <a href={`https://www.imdb.com/title/${movie.imdb_id}/`} target='_blank' rel='noopener noreferrer'>
        <img src={movie.poster} alt={movie.title} />
        <div className='movie_info'>
          <h4>{movie.title}</h4>
        </div>
      </a>
    </div>
  );
};

export default MovieCard;
