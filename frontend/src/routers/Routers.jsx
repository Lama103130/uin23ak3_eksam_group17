import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import UserList from '../pages/userList';
import CatchUp from '../pages/catch_up';
import Bla from '../pages/bla';
import GenrePage from '../pages/GenrePage';


function Routers() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/home" element={<Home />} />
      <Route path="/catch_up" element={<CatchUp />} />
      <Route path="/bla" element={<Bla />} />
      <Route path="/genre/:genreName" element={<GenrePage />} /> 
    </Routes>
  );
}

export default Routers;
