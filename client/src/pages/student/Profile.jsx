import React from 'react'
import ProfileCard from '../../components/student/ProfileCard'
import AboutCard from '../../components/tutor/AboutCard'

export default function Profile() {
  return (
    <div>
      <ProfileCard/>
      <div style={{height:10}}></div>
      <AboutCard/>
    </div>
  )
}
