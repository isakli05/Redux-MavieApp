import Free from '../components/Home/Free'
import Popular from '../components/Home/Popular'
import Trending from '../components/Home/Trending'

function Home() {

  return (
    <div className='bg-slate-900 lg:mx-auto max-w-7xl min-h-screen'>
      <Popular/>
      <Free/>
      <Trending/>
    </div>
  )
}

export default Home