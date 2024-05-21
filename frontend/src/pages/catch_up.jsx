import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { brukerInfo } from '../../Sanity/service';
import MovieCard from '../components/movie_card';
import { fetchFavoriteMoviesDetails } from '../api';


const CatchUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [compareUser, setCompareUser] = useState(null);
  const [sharedWishlistMovies, setSharedWishlistMovies] = useState([]);
  const [sharedFavoriteMovies, setSharedFavoriteMovies] = useState([]);
  const [sharedGenres, setSharedGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const queryParams = new URLSearchParams(location.search);
    const userToCompare = queryParams.get('user');

    if (loggedInUser && userToCompare) {
      const fetchUserData = async () => {
        try {
          const usersData = await brukerInfo();
          const currentUserData = usersData.find(user => user.username === loggedInUser);
          const compareUserData = usersData.find(user => user.username === userToCompare);

          if (!currentUserData || !compareUserData) {
            console.error('One or both users not found.');
            return;
          }

          setCurrentUser(currentUserData);
          setCompareUser(compareUserData);

          const sharedWishlist = currentUserData.wishlist.filter(movie =>
            compareUserData.wishlist.some(compareMovie => compareMovie.imdb_id === movie.imdb_id)
          );

          const sharedFavorites = currentUserData.favorites.filter(movie =>
          compareUserData.favorites.some(compareMovie => compareMovie.imdb_id === movie.imdb_id)
          );

          const sharedWishlistDetails = await fetchFavoriteMoviesDetails(sharedWishlist.map(movie => movie.imdbId));
          const sharedFavoriteDetails = await fetchFavoriteMoviesDetails(sharedFavorites.map(movie => movie.imdbId));
          

          setSharedWishlistMovies(sharedWishlistDetails);
          setSharedFavoriteMovies(sharedFavoriteDetails);
          

          const currentUserGenres = currentUserData.favoriteGenres.map(genre => genre._id);
          const compareUserGenres = compareUserData.favoriteGenres.map(genre => genre._id);

          const sharedGenresIds = currentUserGenres.filter(genreId => compareUserGenres.includes(genreId));
          const sharedGenresData = currentUserData.favoriteGenres.filter(genre => sharedGenresIds.includes(genre._id));

          setSharedGenres(sharedGenresData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleGenreClick = (genreName) => {
    navigate(`/genre/${genreName.toLowerCase()}?user1=${currentUser.username}&user2=${compareUser.username}`);
  };

  return (
    <section className='catch_page'>
      <h2>FORSLAG FOR {currentUser?.username.toUpperCase()} OG {compareUser?.username.toUpperCase()}</h2>
      <div className='page_content'>
        <div className='catch_up_section'>
          <h4>Catch Up!</h4>
          <p>Dere har {sharedWishlistMovies.length} filmer felles i ønskelistene deres.</p>
          {sharedWishlistMovies.map((movie, index) => (
    <MovieCard key={movie.id || `wishlist_${index}`} details={movie} />
  ))}
        </div>

        <div className='Go_safe_section'>
          <h4>Go Safe!</h4>
          <p>Dere har {sharedFavoriteMovies.length} filmer felles i favorittlisten deres.</p>
          {sharedFavoriteMovies.map((movie, index) => (
            <MovieCard key={movie.id || `favorite_${index}`} details={movie} />
          ))}
        </div>

        <div className='Utforsk'>
          <h4>Utforsk!</h4>
          <p>Dere liker begge disse sjangrene, sjekk hvilke filmer som finnes å velge mellom:</p>
          <ul>
            {sharedGenres.map((genre, index) => (
              <li key={index}>
                <a href='#' onClick={() => handleGenreClick(genre.name)}>{genre.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CatchUp;
