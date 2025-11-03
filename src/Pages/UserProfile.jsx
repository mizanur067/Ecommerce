import React from 'react'
import Header from '../Components/Header'
import UserProfileCard from '../Components/UserProfileCard'

import FooterComponent from '../Components/FooterComponent'
const UserProfile = () => {
  return (
    <div>
        <Header/>
        <UserProfileCard/>
        <FooterComponent/>
    </div>
  )
}

export default UserProfile