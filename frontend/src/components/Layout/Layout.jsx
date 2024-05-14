import React from 'react';
import Header from '../header';
import Routers from '../../routers/Routers';

const Layout = () => {
  return <>
    <Header/>
    <div>
      <Routers/>
    </div>
  </>
}

export default Layout;