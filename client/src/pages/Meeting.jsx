import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import VideoCall from '../components/VideoCall';
import DoneIcon from '@mui/icons-material/Done';

const Div = styled.div`
display:flex;
justify-content:center;
align-items:center;
`
const ImageWrapper = styled.div`
margin:5vw;
background-color:rgb(32,129,229);
height:60vh;
width:35vw;
display:flex;
justify-content:center;
align-items:center;
border-radius:20px;
`
const Image = styled.img`
height:55vh;
width:32vw;
border-radius:20px;
`
const Title = styled.h5`
font-size:25px;
padding-top:5vw;
`
const Content = styled.p`
font-size:20px;
padding-top:10px;
`
const LeftWrapper = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const Spacer = styled.div`
height:20px;
`
const Row = styled.div`
display:flex;
`
const Col = styled.div`
display:flex;
flex-direction:column;
`
const Done = styled(DoneIcon)`
padding:10px;
`
export default function Meeting() {
    const [channelName, setChannelName] = useState('')

    useEffect(() => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 7; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        setChannelName(text)
    }, [])
    const navigate = useNavigate()
    const navToRoom = () => {
        navigate(`/room/${channelName}`)
    }
    console.log(channelName)
    return (
        <div>
            <Grid container>
                <Grid item sm={6} lg={6} md={6}>
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <LeftWrapper>
                        <Col>
                            <Title>Create Virtual room Now.</Title>
                            <Row><Done /> <Content>Audio</Content></Row>
                            <Row><Done /> <Content>Video</Content></Row>
                            <Row><Done /> <Content>Screen sharing</Content></Row>
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <Button variant='contained' style={{ width: "200px" }} onClick={navToRoom} >Create Room</Button>
                        </Col>
                    </LeftWrapper>
                </Grid>
                <Grid item sm={6} lg={6} md={6}>
                    <Div>
                        <ImageWrapper>
                            <Image src='https://www.gstatic.com/meet/user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg' />
                        </ImageWrapper>
                    </Div>
                </Grid>
            </Grid>
        </div>
    )
}
