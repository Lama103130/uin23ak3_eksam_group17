import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('loggedInUser');
    setLoggedInUser(username);
  }, []); 

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <header>
      <div className='logo'>
        <a href='/home'>What to see?</a>  
      </div>
      <nav>
        <ul>
          <li>
            <button>
              <a href='/home'>
                <span>Hva skal jeg se?</span>
              </a>
            </button>
          </li>
          <li><a href='/bla'>Bla gjennom sjangere</a></li>
          <li>  
            <span>{loggedInUser}</span>
          </li>
        </ul>
      </nav>
      <div className='mobile_menu'>
        <button onClick={toggleVisibility}>Menu</button>
        {isVisible && (
          <div className='mobile_menu_container'>
            <ul>
              <li>
                <button>
                  <a href='/catch_up'>
                    <span>Hva skal jeg se?</span>
                  </a>
                </button>
              </li>
              <li><a href='/bla'>Bla gjennom sjangere</a></li>
              <li>  
                <span>{loggedInUser}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
