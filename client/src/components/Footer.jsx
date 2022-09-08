import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Grid } from '@mui/material';
const Wrapper = styled.div`
display:flex;
flex-direction:column;
width:100%;
background-color:rgb(32,129,229);
justify-content:space-between;
`

const Title = styled.h2`
padding-bottom:10px;
color:white;
font-size:17px;
`
const Items = styled.div`
display:flex;
flex-direction:column;
`
const Item = styled(Link)`
font-family: "Times New Roman", Times, serif;
color:white;
text-decoration:none;
font-size:19px;
padding-top:7px;
&:hover{
    text-decoration: underline;
}
`
const Row = styled.div`
display:flex;
align-items:center;
`
const Content = styled.p`
font-family: Arial; 
font-size:17px;
color:white;
`
const PhoneIcon = styled(LocalPhoneIcon)`
font-size:40px;
padding-top:7px;
padding-right:10px;
`
const Email = styled(EmailIcon)`
font-size:40px;
padding-top:7px;
padding-right:10px;
`
const Location = styled(LocationOnIcon)`
font-size:40px;
padding-top:7px;
padding-right:10px;
`
const CopyrightContainer = styled.div`
padding:20px 0px;
display:flex;
justify-content:center;
align-items:end;
`
const Copyright = styled.div`
font-size:20px;
color:white;
`
export default function Footer() {
    return (
        <div>
            <Wrapper>
                <Grid sx={{paddingLeft:'30px',paddingRight:'30px'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item lg={3} md={6} sm={12}  sx={{marginTop:'20px'}}>
                        <Title>About</Title>
                        <Content>We provide 1-on-1 online tutoring for students and knowledge seekers.There are also comapnies which provides language and relegious tutors for multiple learners.</Content>
                    </Grid>
                    <Grid item lg={3} md={6} sm={12} sx={{marginTop:'20px'}}>
                    <Title>Tutors</Title>
                        <Items>
                            <Item to='/tutors'>Biology Tutor</Item>
                            <Item to='/tutors'>Mathematics Tutor</Item>
                            <Item to='/tutors'>Physics Tutor</Item>
                            <Item to='/tutors'>English Tutor</Item>
                            <Item to='/tutors'>Marketing Tutor</Item>
                        </Items>
                    </Grid>
                    <Grid item lg={3} md={6} sm={12} sx={{marginTop:'20px'}}>

                    <Title>Top Subjects</Title>
                        <Items>
                            <Item to='/'>Math</Item>
                            <Item to='/'>Foreign languages</Item>
                            <Item to='/'>Programming</Item>
                            <Item to='/'>Software Engineering</Item>
                            <Item to='/'>Marketing</Item>
                            <Item to='/'>Sales</Item>
                            <Item to='/'>History</Item>
                            <Item to='/'>Relegion</Item>
                        </Items>
                    </Grid>
                    <Grid item lg={3} md={6} sm={12} sx={{marginTop:'20px'}}>

                    <Title>Contact Us</Title>
                        <Items>
                            <Row>
                                <PhoneIcon sx={{color:'white'}}/>
                                <Item to='/'>0920202020</Item>
                            </Row>
                            <Row>
                                <Email sx={{color:'white'}}/>
                                <Item to='/'>yegnatutor@gmail.com</Item>
                            </Row>
                            <Row>
                                <Location sx={{color:'white'}}/>
                                <Item to='/'>Ethiopia, Addis Ababa</Item>
                            </Row>
                        </Items>
                    </Grid>
                </Grid>
                <CopyrightContainer>
                    <Copyright>© 2022 YegnaTutor</Copyright>
                </CopyrightContainer>
            </Wrapper>
        </div>
    )
}
