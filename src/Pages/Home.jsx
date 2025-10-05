import React from 'react'
import Header from '../Components/Header'


import AllCategoriesComponent from '../Components/AllCategoriesComponent'
import HomeProductIntialCard from '../Components/HomeProductIntialCard'
import FooterComponent from '../Components/FooterComponent'

const Home = () => {
  return (
    <div>
       <Header />
       <AllCategoriesComponent/>
       <HomeProductIntialCard />
       <FooterComponent />
       
    </div>
  )
}

export default Home