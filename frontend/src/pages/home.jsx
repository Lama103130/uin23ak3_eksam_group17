import React from 'react'
import MovieCard from '../components/movie_card'
// import { RxStarFilled } from "react-icons/rx";

const header = () => {
  const user = 'user name'
  return (
    <section className='home_page'>
    <h3>Hei, '{user}'</h3>
    <div className='container'>
      <div className='main_content'>
        <div className='main_text'>
          <h5>
            {/* <RxStarFilled /> */}
            Filmer jeg skal se!
          </h5>
          <span>
            Disse filmene ligger i ønskelisten din:
          </span>
        </div>
        <MovieCard />
        <MovieCard />
      </div>

      <div className='link_box'>
        <h5>
          Jeg skal se sammen med...
        </h5>
        <ul>
          <li><a href=''>Ulrikke</a></li>
          <li><a href=''>Egil</a></li>
        </ul>
      </div>

    </div>
    </section>
  )
}

export default header