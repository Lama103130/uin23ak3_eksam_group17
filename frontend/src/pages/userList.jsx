import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../../Sanity/client'; 
import '.././index.scss'

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Hente brukerdata fra sanity
    const fetchUsers = async () => {
      try {
        const userData = await sanityClient.fetch('*[_type == "user"]');
        setUsers(userData);
      } catch (error) {
        console.error('Feil ved henting av brukere:', error);
      }
    };

    fetchUsers();
  }, []);

  
  const handleUserClick = (user) => {
    localStorage.setItem('loggedInUser', user.username);
    navigate('/home'); // Naviger til '/home'
  };
  
  return (
    <div className="user-list-container">
      <h1 className="user-list-title">Hvem skal se i dag?</h1>
      <h2 className="user-list-subtitle">Velg bruker</h2>
      <ul className='user-list-item'>
        {users.map(user => (
          <li key={user._id} onClick={() => handleUserClick(user)} className="user-list-item">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default UserList;
