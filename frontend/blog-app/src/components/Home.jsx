import React from 'react'
import Hero from '../Home/Hero'
import { useAuth } from '../context/AuthProvider'
import Trending from '../Home/Trending'
import Devotional from '../Home/Devotional'
import Creators from '../Home/Creators'

function Home() {

  return (
    <div>
      <Hero />
      <Trending />
      <Devotional />
      <Creators />
    </div>
  )
}

export default Home