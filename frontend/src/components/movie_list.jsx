function MovieList({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
      <li key={movie.imdb_id}>
        <h2>{movie.title}</h2>
         <img src={movie.coverImage} alt={movie.title} />
        <a href={movie.imdbLink}>View on IMDb</a>
      </li>
     ))}
    </ul>
  );
}


export default MovieList;