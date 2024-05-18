import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import sanityClient from '../../Sanity/client';
import MovieCard from '../components/movie_card';

const CatchUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [compareUser, setCompareUser] = useState(null);
  const [sharedWishlistMovies, setSharedWishlistMovies] = useState([]);
  const [sharedFavoriteMovies, setSharedFavoriteMovies] = useState([]);
  const [sharedGenres, setSharedGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const queryParams = new URLSearchParams(location.search);
    const userToCompare = queryParams.get('user');

    if (loggedInUser && userToCompare) {
      const fetchUserData = async () => {
        try {
          const [currentUserData, compareUserData] = await Promise.all([
            sanityClient.fetch('*[_type == "user" && username == $username][0]', { username: loggedInUser }),
            sanityClient.fetch('*[_type == "user" && username == $username][0]', { username: userToCompare })
          ]);

          if (!currentUserData || !compareUserData) {
            console.error('One or both users not found.');
            return;
          }

          setCurrentUser(currentUserData);
          setCompareUser(compareUserData);

          const sharedWishlist = currentUserData.wishlist
            .filter(movie => compareUserData.wishlist.some(compareMovie => compareMovie.imdb_id === movie.imdb_id));

          const sharedFavorites = currentUserData.favorites
            .filter(movie => compareUserData.favorites.some(compareMovie => compareMovie.imdb_id === movie.imdb_id));

          setSharedWishlistMovies(sharedWishlist);
          setSharedFavoriteMovies(sharedFavorites);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [location.search]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await sanityClient.fetch('*[_type == "genre"]');
        setSharedGenres(genresData);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='catch_page'>
      <h2>FORSLAG FOR {currentUser.username.toUpperCase()} OG {compareUser.username.toUpperCase()}</h2>
      <div className='page_content'>
        <div className='catch_up_section'>
          <h4>Catch Up!</h4>
          <p>Dere har {sharedWishlistMovies.length} filmer felles i ønskelistene deres.</p>
          {sharedWishlistMovies.map((movie, index) => (
            <MovieCard key={`wishlist_${movie.imdb_id}_${index}`} movie={movie} />
          ))}
        </div>

        <div className='Go_safe_section'>
          <h4>Go Safe!</h4>
          <p>Dere har {sharedFavoriteMovies.length} filmer felles i favorittlisten deres.</p>
          {sharedFavoriteMovies.map((movie, index) => (
            <MovieCard key={`favorite_${movie.imdb_id}_${index}`} movie={movie} />
          ))}
        </div>

        <div className='Utforsk'>
          <h4>Utforsk!</h4>
          <p>Dere liker begge disse sjangrene, sjekk hvilke filmer som finnes å velge mellom:</p>
          <ul>
            {sharedGenres.map((genre, index) => (
              <li key={`genre_${genre._id}_${index}`}>
                <a href=''>{genre.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CatchUp;