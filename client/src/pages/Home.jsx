import React from 'react'
import Header from '../components/Header'
import { specialityData } from '../assets/assets_frontend/assets.js'
import SpecialityMenu from '../components/SpecialityMenu'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
    </div>
  )
}

export default Home
