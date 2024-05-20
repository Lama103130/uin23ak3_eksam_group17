import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sjangerInfo } from '../../Sanity/service';
import MovieCard from '../components/movie_card';

const GenrePage = () => {
  const [genre, setGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const { genreName } = useParams();

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const sjangere = await sjangerInfo();
        const selectedGenre = sjangere.find(genre => genre.name.toLowerCase() === genreName.toLowerCase());

        if (!selectedGenre) {
          console.error('Genre not found:', genreName);
          return;
        }

        setGenre(selectedGenre);
        
        setMovies(selectedGenre.films || []);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      }
    };

    fetchGenreData();
  }, [genreName]);

  if (!genre) {
    return <div>Loading...</div>;
  }

  return (
    <div className='genre_page'>
      <h2>{genre.name}</h2>
      <p>Antall filmer i denne sjangeren: {movies.length}</p>
      <div className='movie_list'>
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
