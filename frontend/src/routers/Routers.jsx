import { Routes, Route, Navigate } from 'react-router-dom';


import Home from '../pages/home';
import CatchUp from '../pages/catch_up';
import Bla from '../pages/bla';


function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='home'/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='catch_up' element={<CatchUp/>}/>
      <Route path='bla' element={<Bla/>}/>
    </Routes>
  )
}

export default Routers