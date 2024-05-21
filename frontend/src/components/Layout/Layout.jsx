import React from 'react';
import Header from '../header';
import Routers from '../../routers/Routers';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Sjekke om brukeren er på innloggingssiden 
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {/* headerkomponenten */}
      {!isLoginPage && <Header />}
      <div>
        <Routers />
      </div>
    </>
  );
}

export default Layout;
