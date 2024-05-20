import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brukerInfo } from '../../Sanity/service';
import MovieCard from '../components/movie_card';
import { fetchFavoriteMoviesDetails } from '../api';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await brukerInfo();
        setUsers(userData);
        
        const username = localStorage.getItem('loggedInUser');
        if (username) {
          setLoggedInUser(username);
          const currentUser = userData.find(user => user.username === username);

          if (currentUser && currentUser.wishlist) {
      
            const movieDetails = await fetchFavoriteMoviesDetails(currentUser.wishlist.map(movie => movie.imdbId));
           
            setMovies(movieDetails);
          } else {
            console.error('Current user or wishlist is undefined:', currentUser);
          }
        } else {
          console.error('No logged in user found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (username) => {
    navigate(`/catch_up?user=${username}`);
  };

  return (
    <section className='home_page'>
      <h3>Hei, {loggedInUser}!</h3>
      <div className='container'>
        <div className='main_content'>
          <div className='main_text'>
            <h5>Filmer jeg skal se!</h5>
            <span>Disse filmene ligger i ønskelisten din:</span>
          </div>
          <div className='movie_list'>
          {movies.map((movie, index) => (
  <MovieCard key={movie.id || `movie-${index}`} details={movie} />
))}
          </div>
        </div>

        <div className='link_box'>
          <h5>Jeg skal se sammen med...</h5>
          <ul>
            {users
              .filter(user => user.username !== loggedInUser)
              .map(user => (
                <li key={user.username} onClick={() => handleUserClick(user.username)}>
                  {user.username}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
