import React from 'react';


function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbLink}>
          <h2>{movie.title}</h2>
          <img src={movie.coverImage} alt={movie.title} />
          <a href={movie.imdbLink}>View on IMDb</a>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;