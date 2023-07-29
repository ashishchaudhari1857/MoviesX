import React from 'react'
import './style.scss'
import Trending from './trending/Trending'
import HeroBanner from './heroBanner/HeroBanner'
 import Popular from './popular/Popular'
 import TopRated from './top-rated/TopRate'
function Home() {
  return (
    <div className='homepage'>
        <HeroBanner></HeroBanner>
        <Trending></Trending>
        <Popular></Popular>
        <TopRated></TopRated>
    </div>
  )
}

export default Home