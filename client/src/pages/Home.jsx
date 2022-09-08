import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styled from 'styled-components'
import Welcome from '../components/Welcome'
import SampleTutors from '../components/SampleTutors'
import SampleSubjects from '../components/SampleSubjects'
import HowTo from '../components/HowTo'
import HowToTutor from '../components/HowToTutor'
export default function Home() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <SampleTutors />
      <SampleSubjects />
      <div style={{display:"flex",justifyContent:"space-around"}}>
      <HowTo/>
      <HowToTutor/>
      </div>
      <Footer />
    </div>
  )
}
