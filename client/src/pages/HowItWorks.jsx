import { Drawer } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components'
import Footer from '../components/Footer';
import HowTo from '../components/HowTo';
import HowToTutor from '../components/HowToTutor';
import Navbar from '../components/Navbar';


const Wrapper = styled.div`
margin:60px 0;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Title = styled.h3`
font-size:30px;
text-align:center;
padding-bottom:40px;
`
const Spacer=styled.div`
height:20px;
`
export default function HowItWorks() {

    return (
        <div>
        <Navbar/>
        <Spacer/>
        <div style={{dislay:"flex",flexDirection:"column",alignItems:"center"}}>
            <HowTo/>
            <Spacer/>
            <HowToTutor/> 
        </div>
        <Spacer/>
        <Footer/>
        </div>
    )
}
