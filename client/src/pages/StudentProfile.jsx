import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MessageIcon from '@mui/icons-material/Message';
import { useSelector } from 'react-redux'
const Spacer = styled.div`
display:flex;
flex-direction:column;
height:40px;
`
const Row=styled.div`
display:flex;
justify-content:space-between;
`
const Space=styled.div`
height:20px;
`
const El=styled.p`
padding-left:10px;
padding-top:5px;
`
export default function StudentProfile() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const {user}=useSelector((state)=>state.auth)
    const [userd,setUserd]=useState()
    const [profile,setProfile]=useState({})
    const [about,setAbout]=useState({})
    const navigate=useNavigate()
    useEffect(async()=>{
        const res= await axios.get(`http://localhost:5000/api/user/${id}`)
        if(res.status==200){
            setUserd(res.data.data)
            setProfile(res.data.data.profile)
            setAbout(res.data.data.about)
        }
    },[]);

    const createConv=async()=>{
        if(user){
          try {
            const data={
              senderId:user.data.id,
              recieverId:id,
            }
            const res =await axios.post('http://localhost:5000/api/conversation',data)
            if(res.status===201){
              console.log('success')
            }
            navigate('/student/dashboard')
          } catch (error) {
            console.log(error)
          }
        }else{
          navigate('/login')
        }
      }
    return (
        <div>
            <Navbar />
            <Spacer />
            <Grid container spacing={2}>
                <Grid item lg={1} sm={0}>
                </Grid>
                <Grid item lg={6} sm={12}>
                    <Card variant="outlined">
                        <React.Fragment>
                            <CardContent>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 300,
                                        backgroundColor: '#959e97',
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        display: "flex"
                                    }}
                                >
                                    <Stack>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={profile?profile.img?'http://localhost:5000/'+profile.img:'':''}
                                            sx={{
                                                width: 150, height: 150, justifyContent: "center", display: "flex"
                                            }}
                                        >
                                        </Avatar>
                                    </Stack>
                                </Box>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                                    <Grid item lg={10}>
                                        <Typography sx={{ fontSize: 18, fontWeight: 600, paddingTop: 2 }} color="text.primary" gutterBottom>
                                            {userd?userd.firstName:''} {userd?userd.lastName:''}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                    </Grid>
                                </Grid>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                                    <Grid item lg={9}>
                                        <Typography variant="body2">
                                            {profile?profile.gradeLevel:''}
                                            <br />
                                            {profile?profile.address:''}
                                            <br />
                                            {profile?profile.phone:''}
                                            <br />
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Space/>
                                <Divider/>
                                <Space/>
                                <Button variant='contained' onClick={createConv}><MessageIcon /> <El>Message</El> </Button>
                            </CardContent>
                        </React.Fragment>
                    </Card>
                    <Spacer />
                    <Card variant="outlined">
                        <React.Fragment>
                            <CardContent>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                                    <Grid item lg={10}>
                                        <Typography sx={{ fontSize: 18, fontWeight: 600, paddingTop: 2 }} color="text.primary" gutterBottom>
                                            About
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography sx={{ fontSize: 17, paddingTop: 2 }} color="text.primary" gutterBottom>
                                    {about?about.content:''}
                                </Typography>
                            </CardContent>
                        </React.Fragment>
                    </Card>
                </Grid>
            </Grid>
            <Spacer />
            <Footer />
        </div>
    )
}
