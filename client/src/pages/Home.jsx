import React from 'react'
import Header from '../components/Header'
import { specialityData } from '../assets/assets_frontend/assets.js'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors.jsx'
import Banner from '../components/Banner.jsx'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
