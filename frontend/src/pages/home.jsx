import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../../Sanity/client';
import MovieCard from '../components/movie_card';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await sanityClient.fetch('*[_type == "user"]');
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchMovies = async () => {
      try {
        const username = localStorage.getItem('loggedInUser');
        setLoggedInUser(username);

        const userData = await sanityClient.fetch('*[_type == "user" && username == $username][0]', { username });

        if (userData && userData.wishlist) {
          const movieList = userData.wishlist.map(movie => ({
            title: movie.title,
            poster: movie.poster,
            imdb_id: movie.imdb_id
          }));

          setMovies(movieList);
        } else {
          console.error('UserData or wishlist is undefined:', userData);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchUsers();
    fetchMovies();
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
          <MovieCard key={index} movie={movie} />
        ))}

          </div>
        </div>

        <div className='link_box'>
          <h5>Jeg skal se sammen med...</h5>
          <ul>
            {users
              .filter(user => user.username !== loggedInUser)
              .map(user => (
                <li key={user._id} onClick={() => handleUserClick(user.username)}>
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
