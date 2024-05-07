import { useState, useEffect } from 'react'
import './App.css'
import { brukerInfo, filmInfo, sjangerInfo } from './Sanity/service'
import Login from './component/Login'

function App() {
  const [brukere, setBrukere] = useState ([])
  const [filmer, setFilmer] = useState ([])
  const [sjangere, setSjangere] = useState ([])

  const fetchData = async () => {
    const alleBrukere = await brukerInfo();
    const alleFilmer = await filmInfo();
    const alleSjangere = await sjangerInfo();

    setBrukere(alleBrukere);
    setFilmer(alleFilmer);
    setSjangere(alleSjangere);

    console.log("Brukere:", alleBrukere);
    console.log("Filmer:", alleFilmer);
    console.log("Sjangere:", alleSjangere);
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      <Login />
      
    </>
  )
}

export default App
