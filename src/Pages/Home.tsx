import React from 'react'
import Free from '../components/Home/Free'
import Popular from '../components/Home/Popular'
import Trending from '../components/Home/Trending'

function Home() {
  return (
    <div className='bg-slate-900'>
      <Popular/>
      <Free/>
      <Trending/>
    </div>
  )
}

export default Home