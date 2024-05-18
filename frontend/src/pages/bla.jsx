import React, { useEffect, useState } from 'react';
import sanityClient from '../../Sanity/client';

const Bla = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Henter sjangere fra Sanity
        const genresData = await sanityClient.fetch('*[_type == "genre"]');
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
        {genres.map((genre, index) => (
          <li key={index}>{genre.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Bla;
