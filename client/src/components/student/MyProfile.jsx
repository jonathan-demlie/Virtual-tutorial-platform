import React from 'react'
import AboutCard from './AboutCard'
import ProfileCard from './ProfileCard'

export default function MyProfile() {
  return (
    <div>
        <ProfileCard/>
        <div style={{height:10}}></div>
        <AboutCard/>
    </div>
  )
}
