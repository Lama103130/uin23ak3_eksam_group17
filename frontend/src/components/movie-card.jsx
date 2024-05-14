import React from 'react';
import Cover from '../assets/cover.jpg';

const MovieCard = ({ title, link, image }) => {
  return (
    <div className="movie-card">
      <div className='movie_cover'>
        <img src={Cover} alt='movie cover' width='230'/>
      </div>
      <div className='description'>
        <span>
          <a href='https://www.imdb.com/title/tt0816692/'>interstellar . (2014)</a>
        </span>
      </div>
    </div>
  );
};

export default MovieCard;