import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer'

import MovieCard from '../components/movie_card'


const CatchUp = () => {

  return (
    <>
    <Header/>
    
    <section className='catch_page'>
      <h2>FORSLAG FOR  MARIUS OG EGIL</h2>
      <div className='page_content'>

        <div className='catch_up_section'>
          <h4>Catch Up!</h4>
          <p>Dere har 2 filmer felles i ønskelistene deres.</p>
          <MovieCard/>
          <MovieCard/>

        </div>



        <div className='Go_sage_section'>
          <h4>Go Safe!</h4>
          <p>Dere har 1 film felles i favorittlisten deres.</p>
          <MovieCard/>
        </div>


        <div className='Utforsk'>
          <h4>Utforsk!</h4>
          <p>Dere liker begge disse sjangerne, sjekk hvike filmer som finnes å velge mellom:</p>
          <ul>
            <li><a href=''>Adventure</a></li>
            <li><a href=''>Action</a></li>
          </ul>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  )
}

export default CatchUp