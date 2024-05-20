import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sjangerInfo } from '../../Sanity/service';

const Bla = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Hente sjangere 
        const genresData = await sjangerInfo();
        console.log("Genres data fetched:", genresData); // logging
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreName) => {
    navigate(`/genre/${genreName.toLowerCase()}`);
  };

  return (
    <section className='catch_page'>
      <h2>Sjangere</h2>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>
            <a href="#" onClick={() => handleGenreClick(genre.name)}>{genre.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Bla;
