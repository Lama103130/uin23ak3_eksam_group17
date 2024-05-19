import React, { useEffect, useState } from 'react';
import { sjangerInfo } from '../../Sanity/service';

const Bla = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Hente sjangere 
        const genresData = await sjangerInfo();
        console.log("Genres data fetched:", genresData); // Legg til logging
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <section className='catch_page'>
      <h2>Sjangere</h2>
      <ul>
        {genres.map(genre => (
          <li key={genre._id}>{genre.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Bla;
